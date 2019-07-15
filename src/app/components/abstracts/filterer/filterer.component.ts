import { Input } from '@angular/core';
import { FiltersService } from 'src/app/services/filters.service';
import { Filter } from 'src/app/interfaces/filter.interface';

/**********************************************************/
/*                                                       */
/*   Filterer                                           */
/*                                                     */
/******************************************************/
/*

This is an abstract component (as such is not usable on its own),
with can be used to extend a component and make its content create a filter value.

******************
*   How To Use   *
******************

*** sub.component.ts ***

- Create a component class that extends this class
- From the child class inject FiltersService and pass to parent class via super(...)
- Within the child class, set the values for any abstract properties from this component (e.g. filterProperty)
- Within the child class, override any additional properties from this component as needed (e.g. initialFilterValue)
- When ready (e.g. ngOnInit), call this.registerFilter to enable a filter based on
- You can then use this.changeFilter(value) and this.resetFilter to manage the value of the created filter.

*****************
*   Contents:   *
*****************

  # Properties
    > Filter Info
    > Filter Configs
    > States
    > Services
  # Constructor
  # Protected
    > Register Filter
    > Reset Filter
    > Change Filter

******************/

export abstract class FiltererComponent {

  /********************************************/
  /*   # Properties                          */
  /******************************************/

  /*******************
  *  > Filter Info   *
  *******************/

  /*
  Fitler Id:
  Unique identifier for the filter.
  Warning: There is no check for the id's unique-ness.
           If the id is in use my multiple filters, they will override eachother.
  */
  protected abstract filterId: string;

  @Input()
  public filterLocation: string = '';

  /**********************
  *  > Filter Configs   *
  **********************/

  protected initialFilterValue: string = ""; // Filter value when filter is initially created (empty string represents an unset filter)
  protected abstract filterProperty: string;
  protected abstract filterValueType: string;
  protected abstract filterCondition: string;
  protected preExistingValue;

  /**************
  *  > States   *
  **************/

  protected filterIsSet: boolean = false; // is a filter currently set

  /****************
  *  > Services   *
  ****************/

  protected filtersService: FiltersService; // injected by extending class

  /********************************************/
  /*   # Constructor                         */
  /******************************************/

  constructor(filtersService: FiltersService) {
    this.filtersService = filtersService;
  }

  /********************************************/
  /*   # Protected                           */
  /******************************************/

  /***********************
  *  > Register Filter   *
  ***********************/

  /*
  Create Filter:
  Add a filter for filtering campaigns in the FiltersService (filters.service.ts).
  This filter is used to emit an event when a new campaign is selected in this component.
  */
  protected registerFilter(): void{
    let existingFilter = this.filtersService.getFilterById(this.filterId);
    if(existingFilter){
      this.handlePreExistingFilter(existingFilter);
    }else {
      this.registerNewFilter();
    }
  }

  /*
  Handle Pre Existing Filter:
  This component will use information from the existing filter
  instead of registering a new one.
  */
  protected handlePreExistingFilter(existingFilter: Filter): void{
    this.preExistingValue = existingFilter.value;
    this.filterId = existingFilter.id;
    this.filterIsSet = true;
  }

  /*
  Register New Filter:
  Register the filter with the filters service.
  */
  protected registerNewFilter(): void{
    let filter: Filter = {
        id: this.filterId,
        property: this.filterProperty,
        value: this.initialFilterValue,
        valueType: this.filterValueType,
        condition: this.filterCondition,
        setLocation: this.filterLocation
    };
    let filterId = this.filtersService.registerFilter(filter);
    this.filterIsSet = true;
    this.filterId = filterId;
  }

  /********************
  *  > Reset Filter   *
  ********************/

  /*
  Reset Filter
  Set the filter's value to an empty string.

  Returns true on success, false if the filter was not found or could not be reset.
  */
  protected resetFilter(): boolean{
    return this.filtersService.resetFilter(this.filterId);
  }

  /*********************
  *  > Change Filter   *
  **********************/

  /*
  Change Filter:
  Change the value of the filter.

  Returns true if the filter was changed successfully. Else, false.
  */
  protected changeFilter(newValue: string|number|boolean){
    return this.filtersService.changeFilter(this.filterId, newValue, this.filterCondition);
  }


}
