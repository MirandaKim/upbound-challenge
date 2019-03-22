import { Component, OnInit } from '@angular/core';
import { CampaignsService } from 'src/app/services/campaigns.service';
import { Campaign } from 'src/app/interfaces/campaign.interface';
import { MenuFilterComponent } from 'src/app/components/abstracts/menu-filter/menu-filter.component'
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

Filtering is handled by the parent class MenuFilterComponent. This component
collects the list of options (the list of campaigns), then uses logic from the
parent class to create the "optionsList" with can be used in the template to create
an html menu.

See components/abstracts/menu-filter/menu-filter.component.ts for more info.


*****************
*   Contents:   *
*****************

  # Properties
    > Campaign Info
    > Menu Configs
    > Filter Configs
    > Services
  # Constructor
  # On Init
  # Protected
    > Get Campaigns
  # For Testing

******************/

@Component({
  selector: 'app-campaign-menu',
  templateUrl: './campaign-menu.component.html',
  styleUrls: ['./campaign-menu.component.scss']
})
export class CampaignMenuComponent extends MenuFilterComponent implements OnInit {

  /********************************************/
  /*   # Properties                          */
  /******************************************/

  /*********************
  *  > Campaign Info   *
  *********************/

  protected optionsList: Campaign[] = []; // list of campaigns from the campaigns api, which will be used as filter options

  /********************
  *  > Menu Configs   *
  ********************/

  protected optionLabelProperty: string = 'campaignName'; // name of property that holds the value that will be used as the option label
  protected optionValueProperty: string = 'id'; // property in the campaign data to ge the value for the filter
  protected optionShowAllLabel: string = "All Campaigns"; // Label for the menu item with represents an upset filter (e.g. "All")

  /**********************
  *  > Filter Configs   *
  **********************/

  protected filterLocationIdDefault: string = 'campaign-menu'; // location id used to represent this component in the FiltersService
  protected filterProperty: string = 'campaignId'; // property this filter is intended to affect/represent

  /****************
  *  > Services   *
  ****************/

  protected campaignsService: CampaignsService; // API for accessing list of campaigns

  /********************************************/
  /*   # Constructor                         */
  /******************************************/

  constructor(
    campaignsService: CampaignsService,
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
    // this.getCampaigns(); // DON'T DELETE! this is the actual api call, apply this when not testing
    this.optionsList = this.getCampaignList_test(); // not the actual data--use instead of api for testing
    this.createMenu(); // this creates the menu items and sets up the filter events
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
      // check if the response does include a list of items
      let valid = res.hasOwnProperty('items');
      if(valid) {
        this.optionsList = res['items'];
      }else{
        this.optionsList = [];
      }
    }, (err) => {
      console.log(`ERROR (campaign-menu.component.ts):`);
      console.log(err);
    });
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
