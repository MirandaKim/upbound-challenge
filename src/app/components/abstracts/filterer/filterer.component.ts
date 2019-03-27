import { Input } from '@angular/core';
import { FiltersService } from 'src/app/services/filters.service';

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
  @Input('locationId')
  protected filterLocationId: string; // location identifier for the filter, as set by the parent component.
  protected filterLocationIdDefault: string = 'filterer'; // location identifier for the filter, if no other value is passed in.

  /**********************
  *  > Filter Configs   *
  **********************/

  protected initialFilterValue: string = ""; // Filter value when filter is initially created (empty string represents an unset filter)
  protected abstract filterProperty: string;
  protected abstract filterValueType: string;
  protected abstract filterCondition: string;

  /**************
  *  > States   *
  **************/

  protected filterId: string; // id for filter as returned by the FiltersService
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
    // if location ID is not set, use the default value.
    this.filterLocationId = this.filterLocationId || this.filterLocationIdDefault;
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
  protected registerFilter(){
    let filterId = this.filtersService.registerFilter(
      this.filterProperty,
      this.initialFilterValue,
      this.filterValueType,
      this.filterCondition,
      this.filterLocationId
    );
    this.filterIsSet = true;
    this.filterId = filterId;
  }

  /********************
  *  > Reset Filter   *
  ********************/

  protected resetFilter(){
    return this.filtersService.resetFilter(this.filterId);
  }

  /*********************
  *  > Change Filter   *
  **********************/

  protected changeFilter(newValue){
    return this.filtersService.changeFilter(this.filterId, newValue, this.filterCondition);
  }


}
