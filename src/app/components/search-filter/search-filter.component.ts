import { Component, OnInit, Input } from '@angular/core';
import { FiltersService } from 'src/app/services/filters.service';
import { FiltererComponent } from 'src/app/components/abstracts/filterer/filterer.component';
import { FilterConditions } from 'src/app/enums/filter-conditions.enum';

/**********************************************************/
/*                                                       */
/*   Search Filter (search-filter.component.ts)         */
/*                                                     */
/******************************************************/
/*

Create a search bar that sends a value to the FiltersService based on user events.
*** NOTE: at this time, the search filter only supports filtering a single property value
          (e.g. 'title' only, not 'title' and 'id')

******************
*   How To Use   *
******************

- Create an instance of the component within a parent component
- Pass values to the instance from the parent:
    - filterProperty: string // property this component intends to filter
    - locationId: string (optional, goes to default value) // location identifier for this filter
    - placeholder: string (optional, goes to default value) // placeholder value in search bar input field

*****************
*   Contents:   *
*****************

  # Properties
    > Search Bar Config
    > Filter Configs
    > States
  # Constructor
  # On Init
  # Protected
    > On Text Input
    > On Cancel Click

******************/

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss']
})
export class SearchFilterComponent extends FiltererComponent implements OnInit {

  /********************************************/
  /*   # Properties                          */
  /******************************************/

  /*************************
  *  > Search Bar Config   *
  *************************/

  /* Create inline search bar that displays when hovered.
    When set to false, there will be no inline search bar created.
    When set to true, a functional inline search bar will be created.*/
  @Input()
  public allowInlineSearchBar: boolean = true;

  @Input('placeholder')
  public inputPlaceHolder: string = 'search'; // placeholder value for search bar input field

  /**********************
  *  > Filter Configs   *
  **********************/
  @Input()
  public filterId: string = 'search-bar';
  @Input()
  public filterProperty: string; // property this component intends to filter, set via parent component
  protected filterValueType: string = 'string'; // type of value this filter uses (e.g. string, number, boolean...)
  protected filterCondition: string = FilterConditions[2]; // includes

  /**************
  *  > States   *
  **************/

  public inputValue: string = ''; // value currently in search input

  /********************************************/
  /*   # Constructor                         */
  /******************************************/

  constructor(filtersService: FiltersService) {
    super(filtersService); // give filter service to the parent class
  }

  /********************************************/
  /*   # On Init                             */
  /******************************************/

  ngOnInit() {
    this.registerFilter(); // register a filter with the FiltersService
    if(this.preExistingValue) this.inputValue = this.preExistingValue; // set the input value to a pre-existing value if it is set
  }

  /********************************************/
  /*   # Protected                           */
  /******************************************/

  /********************
  *  > On Text Input  *
  ********************/

  /*
  On Text Input:
    - Get the new value in the search bar input,
    - and use it to change the filter value.
  */
  protected onTextInput(e: {target: {value: string}}){
    this.inputValue = e.target.value;
    this.changeFilter(this.inputValue);
  }

  /**********************
  *  > On Cancel Click  *
  **********************/

  /*
  On Cancel Click:
    - Set the input value to an empty string,
    - and reset the filter value
  */
  protected onCancelClick(){
    this.inputValue = '';
    this.resetFilter();
  }


}
