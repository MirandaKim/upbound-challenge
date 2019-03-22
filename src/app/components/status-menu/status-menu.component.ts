import { Component, OnInit } from '@angular/core';
import { MenuFilterComponent } from 'src/app/components/abstracts/menu-filter/menu-filter.component'
import { FiltersService } from 'src/app/services/filters.service';
import { FilterConditions } from 'src/app/enums/filter-conditions.enum';

/**********************************************************/
/*                                                       */
/*   Status Menu                                        */
/*                                                     */
/******************************************************/
/*

Display a list of card statuses.
This component provides a status filter when a status is clicked from the menu
of options in this component's template.

Filtering is handled by the parent class MenuFilterComponent. This component
has the list of options (card status options), then uses logic from the
parent class to create the "optionsList" with can be used in the template to create
an html menu.

See components/abstracts/menu-filter/menu-filter.component.ts for more info.


*****************
*   Contents:   *
*****************

  # Properties
    > Status Info
    > Menu Configs
    > Filter Configs
    > Services
  # Constructor
  # On Init
  # Protected
    > Get Card Status List
  # For Testing

******************/

interface CardStatus {
  label: string;
  workflow: string;
}

@Component({
  selector: 'app-status-menu',
  templateUrl: './status-menu.component.html',
  styleUrls: ['./status-menu.component.scss']
})
export class StatusMenuComponent extends MenuFilterComponent implements OnInit {

  /********************************************/
  /*   # Properties                          */
  /******************************************/

  /*******************
  *  > Status Info   *
  *******************/

  protected optionsList: CardStatus[];
  protected statusList: string[] = [
    "saved",
    "pending",
    "active",
    "paused",
    "expired",
    "declined",
    "terminated"
  ];

  /********************
  *  > Menu Configs   *
  ********************/

  protected optionLabelProperty: string = 'label'; // name of property that holds the value that will be used as the option label
  protected optionValueProperty: string = 'workflow'; // property in the campaign data to ge the value for the filter
  protected optionShowAllLabel: string = "All"; // Label for the menu item with represents an upset filter (e.g. "All")

  /**********************
  *  > Filter Configs   *
  **********************/

  protected filterLocationIdDefault: string = 'status-menu'; // location id used to represent this component in the FiltersService
  protected filterProperty: string = 'currentWorkflow'; // property this filter is intended to affect/represent


  /********************************************/
  /*   # Constructor                         */
  /******************************************/

  constructor(
    filtersService: FiltersService // get the filters service for super component
  ) {
    super(filtersService);
  }

  /********************************************/
  /*   # On Init                             */
  /******************************************/

  ngOnInit() {
    /*
    Get Campaign Data
    */
    this.optionsList = this.getCardStatusList(); // not the actual data--use instead of api for testing
    this.createMenu(); // this creates the menu items and sets up the filter events
  }

  /********************************************/
  /*   # Protected                           */
  /******************************************/

  /****************************
  *  > Get Card Status List   *
  ****************************/

  protected getCardStatusList(): CardStatus[]{
    let formattedList: CardStatus[] = [];
    /*Loop through each status value and create a formatted list of items*/
    for (let i=0; i<this.statusList.length; i++){
      formattedList.push({
        label: this.statusList[i].charAt(0).toUpperCase() + this.statusList[i].slice(1), // capitalize status value for label
        workflow: this.statusList[i]
      });
    }
    return formattedList;
  }


}
