import { Component, OnInit, Input } from '@angular/core';
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

  /*
  List of workflow options including thier value and thier label.
  */
  protected optionsList: CardStatus[] = [
      {
        label: "Saved",
        workflow: "saved"
      },
      {
        label: "Pending",
        workflow: "pending"
      },
      {
        label: "Live",
        workflow: "active"
      },
      {
        label: "Paused",
        workflow: "paused"
      },
      {
        label: "Expired",
        workflow: "expired"
      },
      {
        label: "Rejected",
        workflow: "declined"
      },
      {
        label: "Terminated",
        workflow: "terminated"
      }
  ]

  /********************
  *  > Menu Configs   *
  ********************/

  @Input('showAllLabel')
  public optionShowAllLabel: string = "All"; // Label for the menu item with represents an upset filter (e.g. "All")

  protected optionLabelProperty: string = 'label'; // name of property that holds the value that will be used as the option label
  protected optionValueProperty: string = 'workflow'; // property in the campaign data to ge the value for the filter

  /**********************
  *  > Filter Configs   *
  **********************/

  @Input()
  protected filterId: string = 'status-menu';
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
    this.createMenu(); // this creates the menu items and sets up the filter events
  }



}
