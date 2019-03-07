import { Component, OnInit } from '@angular/core';
import { CampaignsService } from 'src/app/services/campaigns.service';
import { Campaign } from 'src/app/interfaces/campaign.interface';
import { FiltersService } from 'src/app/services/filters.service';
import { FilterConditions } from 'src/app/enums/filter-conditions.enum';
import * as $ from 'jquery';

/**********************************************************/
/*                                                       */
/*   Campaign Menu                                      */
/*                                                     */
/******************************************************/
/*

Display a list of campaigns from the campaigns api.
This component provides a campaign filter when a campain is clicked from the template.

*****************
*   Contents:   *
*****************

  # Interfaces
  # Properties
  # Constructor
  # On Init
  # Protected
    > Configs
    > Get Cards
  # Private
    > Change Filter
  # For Testing

******************/

/********************************************/
/*   # Interfaces                          */
/******************************************/

interface CampaignMenuItem {
  label: string; // Name of campaign as displayed in the html template
  dataIndex: number; // index of campaign in list returned from api
}

@Component({
  selector: 'app-campaign-menu',
  templateUrl: './campaign-menu.component.html',
  styleUrls: ['./campaign-menu.component.scss']
})
export class CampaignMenuComponent implements OnInit {

  /********************************************/
  /*   # Properties                          */
  /******************************************/

  /*********************
  *  > Campaign Info   *
  *********************/

  protected campaignList: Campaign[]; // list of campaigns from the campaigns api
  protected listItems: CampaignMenuItem[]; // list of campaign information for the html template to create a menu

  protected idProperty: string = 'id'; // name of property that holds the id value in campaign objects
  protected labelProperty: string = 'campaignName'; // name of property that holds the name value in campaign objects
  protected showAllLabel: string = "All Campaigns"; // Label for the menu item with represents an upset filter (e.g. "All")

  /**************
  *  > States   *
  **************/
  protected selectedItemIndex; // currently selected campaign index

  /**********************
  *  > Filter Configs   *
  **********************/
  protected filterIsSet: boolean = false; // is a filter currently set
  protected filterId: string; // id for filter as returned by the FiltersService
  protected initialFilterValue: string = ""; // Filter value when filter is initially created (empty string represents an unset filter)

  protected filterSetLocation: string = 'campaign-menu'; // location id used to represent this component in the FiltersService
  protected filterProperty: string = 'campaignId'; // property this filter is intended to represent (as seen in cards data)
  protected filterValueProperty: string = this.idProperty; // property in the campaign data to ge the value for the filter
  protected filterValueType: string = 'string'; // type of value
  protected filterCondition: string = FilterConditions[0]; // match

  /****************
  *  > Services   *
  ****************/

  protected campaignsService: CampaignsService;
  protected filtersService: FiltersService;

  /********************************************/
  /*   # Constructor                         */
  /******************************************/

  constructor(
    campaignsService: CampaignsService,
    filtersService: FiltersService
  ) {
    this.campaignsService = campaignsService;
    this.filtersService = filtersService;
  }

  /********************************************/
  /*   # On Init                             */
  /******************************************/

  ngOnInit() {
    /*
    Get Campaign Data
    */
    // this.getCampaigns(); // DON'T DELETE! this is the actual api call, apply this when not testing
    this.campaignList = this.getCampaignList_test(); // not the actual data--use instead of api for testing
    /*
    Organize campaigns into a list for the menu template.
    This includes an 'All Campaigns' selection at the top (index: 0)
    */
    this.listItems = this.createItemList();
    /*
    Set currently selected campaign.
    Initial index set to 0 for all campaigns.
    */
    this.selectedItemIndex = 0;
    /*
    Create filter to emit an event when the selected campaign is changed
    */
    this.createFilter();
  }

  /********************************************/
  /*   # Protected                           */
  /******************************************/


  /*********************
  *  > Get Campaigns   *
  *********************/

  /*
  Get Campaigns
  Get the list of campaigns by accessing the campaign api.
  */
  protected getCampaigns(): void {
    let campaigns: Campaign[];
    this.campaignsService.readAll().subscribe((res) => {
      let valid = res.hasOwnProperty('items');
      if(valid) {
        this.campaignList = res['items'];
      }else{
        this.campaignList = [];
      }
    }, (err) => {
      console.log(`ERROR (campaign-menu.component.ts):`);
      console.log(err);
    });
  }

  /************************
  *  > Create Item List   *
  ************************/

  /*
  Create Item List
  Create the inforamtion to generate the campaign menu in the template.
  This loops through the list of campaigns and pulls out the information needed for the template.
  This also adds an emtpy campaign to the top of the list intended to reset the campaign filter.
  */
  protected createItemList(): CampaignMenuItem[]{
    /*
    Create initial menu item
    */
    let itemList: CampaignMenuItem[] = [
      {
        label: this.showAllLabel, // Name of campaign as displayed in the html template
        dataIndex: -1 // set as -1 as it's not a valid campaign option
      }
    ];
    /*
    Loop through each and create a menu item for each campaign
    */
    $(this.campaignList).each((index) => {
      let item = {
        label: this.campaignList[index][this.labelProperty], // name
        dataIndex: index // index of campaign in list returned from api
      };
      itemList.push(item);
    });
    return itemList;
  }

  /*********************
  *  > Create Filter   *
  *********************/

  /*
  Create Filter:
  Add a filter for filtering campaigns in the FitlersService (filters.service.ts).
  This filter is used to emit an event when a new campaign is selected in this component.
  */
  protected createFilter(){
    let filterId = this.filtersService.createFilter(
      this.filterProperty,
      this.initialFilterValue,
      this.filterValueType,
      this.filterCondition,
      this.filterSetLocation
    );
    this.filterIsSet = true;
    this.filterId = filterId;
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
      this.changeFilter(item.dataIndex);
    }else{
      this.filtersService.resetFilter(this.filterId);
    }
  }

  /********************************************/
  /*   # Private                             */
  /******************************************/

  /*********************
  *  > Change Filter   *
  *********************/

  /*
  Change Filter
  Change the value of the campaign filter by providing the campaign's index
  */
  private changeFilter(itemIndex){
    let newValue = this.campaignList[itemIndex][this.filterValueProperty];
    let result = this.filtersService.changeFilter(this.filterId, newValue, this.filterCondition);
  }

  /********************************************/
  /*   # For Testing                         */
  /******************************************/
  /*
  TEST FUNCTION
  Dev note: this function is only for development purposes when API cannot be accessed.
  */

  private getCampaignList_test(){
    return [
      {
        "id": "CN201701182",
        "campaignName": "Camp"
      },
      {
        "id": "CN201701188",
        "campaignName": "Snew"
      },
      {
        "id": "CN2017012321",
        "campaignName": "kjasd"
      },
      {
        "id": "CN2017012431",
        "campaignName": "some name"
      },
      {
        "id": "CN2017020638",
        "campaignName": "abc1"
      },
      {
        "id": "CN2017020640",
        "campaignName": "abc2"
      },
      {
        "id": "CN2017020641",
        "campaignName": "abc3"
      },
      {
        "id": "CN2017020642",
        "campaignName": "abc4"
      },
      {
        "id": "CN2017020643",
        "campaignName": "abc5"
      },
      {
        "id": "CN2017020644",
        "campaignName": "abc6"
      }
    ];

  }

}
