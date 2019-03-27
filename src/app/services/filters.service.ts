import { Injectable, Output, EventEmitter } from '@angular/core';
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

This service returns a filter id when a filter is created,
which can be used to edit the filter (it's value or condition).

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
  # Protected
    > Configs
    > Get Cards
  # Private
    > Apply Filter Change
  # On Destroy
  # For Testing

******************/

@Injectable({
  providedIn: 'root'
})
export class FiltersService {

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

  protected masterList: Filter[] = []; // stores list of current filters
  protected filterCt: number = 0; // keep count of the created filters for creating filter ids

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
  Get Filters:
  Get any filters for a given property.
  Optional: specify the location where the filter was set.
  */
  public getFilters(property: string, setLocation: string = ''): Filter[]{
    let matches = this.findFilters(property, setLocation);
    return matches;
  }

  /*
  Get Filter By ID:
  Get the filter matching the provided id.
  Null will be returned if no filter has this id.
  */
  public getFilterById(filterId): Filter|null{
    let matches: Filter[] = this.findFilters('id', filterId);
    let match: Filter|null = null;
    /*If at least one filter was found,
    return the first one.*/
    if(matches.length > 0) {
      match = matches[0];
    }
    return match;
  }

  /***********************
  *  > Register Filter   *
  ***********************/

  /*
  Register Filter:
  Register/Create a new filter to add to the master list of filters.
  Include all initial values.
  This will emit an event to let those listening know that there is a new filter.

  property: the item property this intends to filter by (e.g. 'id', 'name', 'state')
  value: the initial value of the filter. Leave as emtpy string for no value. (e.g. 'Hello', 'active', '')
  valueType: what is the value's type? (e.g. 'string', 'number')
  condition: the filter condition (e.g. 'match', 'is-not', 'include') See enums/filter-conditions.enum.ts for all conditions
  setLocation: provide a location/id for where this filter is being set so components can pick filters based on where they came from.

  Returns a filter id (string) for your newly created filter which can be used to change/delete your filter.
  */
  public registerFilter(property: string, value: string|number|boolean, valueType: string, condition: string, setLocation: string): string{
    this.filterCt++;
    let id = this.filterCt.toString();
    let filter: Filter = {
      id,
      property,
      value,
      valueType,
      condition,
      setLocation
    }
    this.masterList.push(filter);
    this.emitChange(filter);
    return id;
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
    let filterIndex = this.getFilterIndex(filterId);
    try{
      this.masterList[filterIndex].value = value;
      this.masterList[filterIndex].condition = condition;
      this.emitChange(this.masterList[filterIndex]);
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
  */
  public resetFilter(filterId: string): boolean{
    return this.changeFilter(filterId, '', '');
  }

  /*********************
  *  > Delete Filter   *
  *********************/
  /*
  Delete Filter By Id
  Use the id of a filter to delete it from the master list.
  This will emit the delete event and send the information for the deleted filter
  to those listening for it.
  Returns true if the filter was successfully deleted. Else, false.
  */
  public deleteFilterById(filterId): boolean{
    let filterIndex = this.getFilterIndex(filterId);
    /*
    If the filter exists in the master list,
    remove it, emit the delete event, and return true.
    */
    if(filterIndex > -1) {
      let filterInfo = this.masterList[filterIndex]; // get filter's index
      this.masterList.splice(filterIndex, 1); // remove filter from master list
      this.emitDelete(filterInfo); // emit the delete event
      return true;
    }else{
      return false;
    }
  }

  /********************************************/
  /*   # Protected                           */
  /******************************************/

  /********************
  *  > Find Filters   *
  ********************/
  /*
  Find Filters:
  Find any and all filters for a specific property (optionally from a specific location).
  Returns a list of filters with the correct match.
  */
  protected findFilters(property: string, setLocation: string = ''): Filter[]{
      let matches = this.masterList.filter((filter) => {
        let locationCheck = setLocation.length > 0 ? setLocation == filter.setLocation : true;
        let checkProperty = (property == filter['property']);
        return locationCheck && checkProperty;
      });
      return matches;
  }

  /********************************************/
  /*   # Private                             */
  /******************************************/

  /************************
  *  > Get Filter Index   *
  ************************/
  /*
  Get Filter Index:
  Get the a filter's position in the master list.
  */
  private getFilterIndex(filterId: string): number{
    let index = this.masterList.map((filter) => {
      return filter.id;
    }).indexOf(filterId);
    return index;
  }

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
}
