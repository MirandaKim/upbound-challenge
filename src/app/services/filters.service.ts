import { Injectable, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Filter } from 'src/app/interfaces/filter.interface';

/**********************************************************/
/*                                                       */
/*   Filters Service                                    */
/*                                                     */
/******************************************************/
/*

This is the middle-man between services/components that set filters
and components that use those filters to filter the display of their data.
This service keeps track of all the current filters,
which can be accessed/modified/deleted/created from the outside and emits event
to inform listening components/services of the change.

This service returns the filter id when a filter is created,
which can be used to edit the filter (it's value or condition).
*** Dev Note: this service no longer generates an id for each filter,
              but uses the id value passed to it when the the filter is registered.
 [WARNING]->  This means registering a filter with a pre-existing id will override
              the value/conditions for that id.
 [Useful?]->  This also means multiple filter components can modify the same filter value/condition.

*************************
*   Register a Filter   *
*************************

Register/Create a filter with the initial values, condition, and property it's intended to filter
with the this.registerFilter(...) method. This returns a filter id with can be used to
get, edit, or delete the filter. An event will be emitted when a filter is created or changed.

**************************
*   Accessing a Filter   *
**************************

You can get filters by calling one of the below get methods
(this.getFilters(...) or this.getfilterById(...))
or by listening to the onFilterChange event.

*************************
*   Deleting a Filter   *
*************************

Delete is intended for a filter that should no longer be used by components.
Those listening to onFilterDelete will be informed on delete.
To 'unset' a filter value, change the value to an empty string ('')
or use the reset method (this.resetFilter(...)) instead of deleting it.

*****************
*   Contents:   *
*****************

  # Events
  # Properties
  # Constructor
  # Public
    > Get Filters
    > Register Filter
    > Change Filter
    > Reset Filter
    > Delete Filter
  # Private
    > Apply Filter Change
  # On Destroy

******************/

@Injectable({
  providedIn: 'root'
})
export class FiltersService implements OnDestroy{

  /********************************************/
  /*   # Events                              */
  /******************************************/

  @Output()
  public onFilterChange = new EventEmitter<Filter>(); // filter was changed or created event
  @Output()
  public onFilterDelete = new EventEmitter<Filter>(); // filter was deleted event

  /********************************************/
  /*   # Properties                          */
  /******************************************/

  protected masterList = {};
  protected filterCt: number = 0; // keep count of the created filters for creating filter ids
  protected setLocationFilterIds = {};

  /********************************************/
  /*   # Constructor                         */
  /******************************************/

  constructor() { }

  /********************************************/
  /*   # Public                              */
  /******************************************/

  /*******************
  *  > Get Filters   *
  *******************/

  /*
  Get All Filters:
  Get an array of all the availible filters.
  If no filters are registered, an empty array is returned.
  */
  public getAllFilters(): Filter[]{
    let filters = [];
    Object.keys(this.masterList).map((key) =>{
      filters.push(this.masterList[key]);
    });
    return filters;
  }

  /*
  Get Filters by Property
  Return a list of filters that match the requested filterProperty value
  (e.g. id, setLocation, valueType...)

  Returns an array of filters. If no matches are found, an empty array will be returned.
  */
  public getFiltersByProperty(filterProp: string, value: string|number|boolean|null): Filter[]{
    let filters = [];
    Object.keys(this.masterList).map((key) =>{
      let item = this.masterList[key];
      if(item[filterProp] === value) filters.push(item);
    });
    return filters;
  }

  /*
  Get Filter By ID:
  Get the filter matching the provided id.
  Null will be returned if no filter has this id.
  */
  public getFilterById(filterId: string): Filter|null{
    return this.masterList[filterId];
  }

  /***********************
  *  > Register Filter   *
  ***********************/

  /*
  Register Filter:
  Register/Create a new filter to add to the master list of filters.
  This will emit an event to let those listening know that there is a new filter.

  ** Filter Object **
  id: a unique identifier that can be used to modify the filter being registered
  property: the item property this intends to filter by (e.g. 'id', 'name', 'state')
  value: the initial value of the filter. Leave as emtpy string for no value. (e.g. 'Hello', 'active', '')
  valueType: what is the value's type? (e.g. 'string', 'number')
  condition: the filter condition (e.g. 'match', 'is-not', 'include') See enums/filter-conditions.enum.ts for all conditions
  setLocation: provide a location/id for where this filter is being set so components can pick filters based on where they came from (e.g. 'header', 'footer', 'advanced-filter-popup', ...).

  Returns a filter id (string) for your newly created filter which can be used to change/delete your filter.
  */
  public registerFilter(filter: Filter): string{
    let id = filter.id;
    this.masterList[id] = filter; // safe the filter to the master list under the provided id
    this.emitChange(filter); // emit an event for the new filter
    return id; // return the under which this new filter is stored.
  }

  /*********************
  *  > Change Filter   *
  *********************/

  /*
  Change Filter:
  Change the value and/or condition of an existing filter.
  Provide the id, value, and the filter condition.
  An event will be emited to those listening with the filter's information if the change was successful.

  Returns true if the filter was changed successfully. Else, false.
  */
  public changeFilter(filterId: string, value: string|number|boolean, condition: string): boolean {
    try{
      this.masterList[filterId].value = value;
      this.masterList[filterId].condition = condition;
      this.emitChange(this.masterList[filterId]);
      return true;
    }catch(e){
      console.log(e);
      return false;
    }
  }

  /********************
  *  > Reset Filter   *
  ********************/

  /*
  Reset Filter
  Set the filter's value and condition to empty strings.
  This filter will still exist and can be accessed/changed, but the property will
  be considered unfiltered.

  Returns false if filter does not exist or could not be reset.
  */
  public resetFilter(filterId: string): boolean{
    if(this.masterList.hasOwnProperty(filterId)){
      return this.changeFilter(filterId, '', '');
    }
    return false;
  }

  /*
  Reset All Filters
  Loop through each of the registered filters and
  set their values and conditions to empty strings.

  Returns the number of filters reset.
  */
  public resetAllFilters(): number{
    let count = 0;
    Object.keys(this.masterList).map((key) =>{
      if(this.resetFilter(key)) count++;
    });
    return count;
  }

  /*
  Reset Filter By Location
  Loop through each of the registered filters and
  reset the ones with a location matching the passed filterLocation value.

  Returns the number of filters reset
  */
  public resetFiltersByLocation(filterLocation: string): number{
    let count = 0;
    Object.keys(this.masterList).map((key) => {
      if(this.masterList[key].setLocation === filterLocation){
        if(this.resetFilter(key)) count++;
      }
    });
    return count;
  }

  /*********************
  *  > Delete Filter   *
  *********************/
  /*
  Delete Filter
  Use the id of a filter to delete it from the master list.
  This will emit the delete event and send the information for the deleted filter
  to those listening for it.

  Returns true if the filter was successfully deleted. Else, false.
  */

  public deleteFilter(filterId): boolean {
    if(this.masterList.hasOwnProperty(filterId)){
      let filterInfo = this.masterList[filterId];
      delete this.masterList[filterId];
      this.emitDelete(filterInfo);
      return true;
    }
    return false;
  }

  /*
  Delete All Filters
  Delete all the filters from the master list.

  Returns the number of filters deleted.
  */
  public deleteAllFilters(): number {
    let count = 0;
    Object.keys(this.masterList).map((key) => {
      if(this.deleteFilter(key)) count++;
    });
    return count;
  }

  /********************************************/
  /*   # Private                             */
  /******************************************/

  /*******************
  *  > Emit Events   *
  *******************/

  /*
  Emit Change:
  Let listening components/services know that a filter was created or changed,
  and send the details for that filter.
  */
  private emitChange(filterObj: Filter){
    this.onFilterChange.emit(filterObj);
  }

  /*
  Emit Delete:
  Let listening components/services know that a filter was deleted,
  and send the details for that filter.
  */
  private emitDelete(filterObj: Filter){
    this.onFilterDelete.emit(filterObj);
  }

  /********************************************/
  /*   # On Destroy                          */
  /******************************************/

  /*
  On Destroy:

  If an instance of this class is destroyed...
  */
  ngOnDestroy(){
    this.deleteAllFilters(); // all it's filters will be deleted and delete events will be emitted to the listening components/services.
  }

}
