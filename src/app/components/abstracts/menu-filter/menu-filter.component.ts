import { Input } from '@angular/core';
import { FiltererComponent } from 'src/app/components/abstracts/filterer/filterer.component';
import { FiltersService } from 'src/app/services/filters.service';
import { FilterConditions } from 'src/app/enums/filter-conditions.enum';
import * as $ from 'jquery';

/**********************************************************/
/*                                                       */
/*   Menu Filter                                        */
/*                                                     */
/******************************************************/
/*

This is an abstract component (as such is not usable on its own),
with can be used to extend a component and make its content create a filter value via a list of options.

******************
*   How To Use   *
******************

*** sub.component.ts ***

- Create a component that extends this class
- From the child class inject FiltersService and pass to parent class via super(...)
- Within the constructor or ngOnInit method of the component,
  create the list of filter options that will be displayed as a menu in the component's template.
        What should be included in these options?
        - A property which can be used as an option label (e.g. 'title'),
        - A property which can be used as an option value (e.g. 'id')
- Set the values for any abstract properties from this component (e.g. filterProperty)
- Override any additional properties from this component as needed (e.g. filterValueType)


*** sub.component.html ***

- Loop through the list of items in the property menuItems to create the menu items for the component.
  Including the item's label (item's value is not required in the template, unless desired).
- Include a click event for triggering the filter change and pass the item through the event: onItemClick(item)
  EX:
  <ul>
    <li *ngFor="let item of menuItems">
      <button (click)="onItemClick" class="{{ item.class }}">{{ item.label }}</button>
    </li>
  </ul>

*****************
*   Contents:   *
*****************

  # Interfaces
  # Class
  # Properties
    > List Info
    > Menu Configs
    > Filter Configs
    > States
  # Constructor
  # Protected
    > On Item Click
    > Create Menu Items


******************/


/********************************************/
/*   # Interfaces                          */
/******************************************/

interface MenuItem {
  label: string; // Name of campaign as displayed in the html template
  dataIndex: number; // index of campaign in list returned from api
  class?: string;
}

/********************************************/
/*   # Class                               */
/******************************************/

export abstract class MenuFilterComponent extends FiltererComponent {

  /********************************************/
  /*   # Properties                          */
  /******************************************/

  /*****************
  *  > List Info   *
  *****************/

  protected menuItems: MenuItem[]; // list of campaign information for the html template to create a menu
  protected abstract optionsList: any[]; // list of availible filter options

  /********************
  *  > Menu Configs   *
  ********************/

  protected abstract optionLabelProperty: string; // property that holds the value that will be used as the option label
  protected abstract optionValueProperty: string; // propety that holds the value that will be used as the option value
  protected optionShowAllLabel: string = "All"; // Label for the menu item with represents an upset filter (e.g. "All")

  /**********************
  *  > Filter Configs   *
  **********************/

  protected abstract filterProperty: string; // property in data outside this component that this filter is intended to represent/affect
  protected filterLocationIdDefault: string = 'menu-filter'; // default value if parent component does not pass a value
  protected filterValueType: string = 'string'; // type of value
  protected filterCondition: string = FilterConditions[0]; // match

  /**************
  *  > States   *
  **************/

  protected selectedItemIndex; // currently selected campaign index

  /********************************************/
  /*   # Constructor                         */
  /******************************************/

  constructor(filtersService: FiltersService) {
    super(filtersService);
  }

  /********************************************/
  /*   # Protected                           */
  /******************************************/

  protected createMenu() {
    /*
    Organize campaigns into a list for the menu template.
    This includes an 'All Campaigns' selection at the top (index: 0)
    */
    this.menuItems = this.createMenuItems();
    /*
    Set currently selected campaign.
    Initial index set to 0 for all campaigns.
    */
    this.selectedItemIndex = 0;
    /*
    Register/Create filter to emit an event when the selected campaign is changed
    */
    this.registerFilter();
  }


  /*********************
  *  > On Item Click   *
  *********************/

  /*
  On Item Click
  When a user clicks the one of the campaigns:
    - Change the value of the campaign filter
    - If the clicked campaign's index is -1,
      this represents all the cmapaigns and the filter will be unset.
  */
  protected onItemClick(item){
    this.selectedItemIndex = item.dataIndex + 1;
    if(item.dataIndex > -1) {
      let newValue = this.optionsList[item.dataIndex][this.optionValueProperty];
      this.changeFilter(newValue); // set the filter's new value
    }else{
      this.resetFilter(); // reset the filter to no value
    }
  }

  /*************************
  *  > Create Menu Items   *
  *************************/

  /*
  Create Menu Items
  Create the inforamtion to generate the campaign menu in the template.
  This loops through the list of campaigns and pulls out the information needed for the template.
  This also adds an emtpy campaign to the top of the list intended to reset the campaign filter.
  */
  protected createMenuItems(): MenuItem[]{
    /*
    Create initial menu item
    */
    let menuItems: MenuItem[] = [
      {
        label: this.optionShowAllLabel, // Name of campaign as displayed in the html template
        dataIndex: -1, // set as -1 as it's not a valid campaign option
        class: 'menu-filter__item'
      }
    ];
    /*
    Loop through each and create a menu item for each campaign
    */
    $(this.optionsList).each((index) => {
      let item = {
        label: this.optionsList[index][this.optionLabelProperty], // name
        dataIndex: index, // index of campaign in list returned from api
        class: 'menu-filter__item'
      };
      menuItems.push(item);
    });
    return menuItems;
  }


}
