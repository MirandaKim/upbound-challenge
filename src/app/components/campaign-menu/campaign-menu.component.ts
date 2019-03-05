import { Component, OnInit } from '@angular/core';
import { CampaignsService } from 'src/app/services/campaigns.service';
import { Campaign } from 'src/app/interfaces/campaign.interface';
import { FiltersService } from 'src/app/services/filters.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-campaign-menu',
  templateUrl: './campaign-menu.component.html',
  styleUrls: ['./campaign-menu.component.scss']
})
export class CampaignMenuComponent implements OnInit {

  /********************************************/
  /*   # Properties                          */
  /******************************************/

  protected listItems;
  protected selectedItemIndex;
  protected filterSetLocation: string = 'campaign-menu';
  protected filterProperty: string = 'campaignId';
  protected filterValueProperty: string = 'id';
  protected filterValueType: string = 'string';
  protected labelProperty: string = 'campaignName';
  protected showAllLabel: string = "All Campaigns";
  protected initialFilterValue: string = "";

  protected filterIsSet: boolean = false;
  protected filterId: string;

  protected campaignsService: CampaignsService;
  protected campaignList: Campaign[];

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
    this.campaignList = this.getCampaignList_test();
    this.listItems = this.createItemList();
    this.selectedItemIndex = 0;
    let filterId = this.filtersService.addFilter(
      this.filterProperty,
      this.initialFilterValue,
      this.filterValueType,
      this.filterSetLocation
    );
    this.filterIsSet = true;
    this.filterId = filterId;
  }

  /********************************************/
  /*   # Protecte                            */
  /******************************************/

  protected getCampaignList() {
    let campaigns: Campaign[];
    this.campaignsService.readAll().subscribe((res) => {
      let valid = res.hasOwnProperty('items');
      if(valid) {
        campaigns = res['items'];
      }else{
        campaigns = [];
      }
      console.log('Fetched!');
    }, (err) => {
      console.log(`ERROR (campaign-menu.component.ts):`);
      console.log(err);
    });
    return campaigns;
  }

  protected getCampaignList_test(){
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

  protected createItemList(){
    let itemList = [
      {
        label: this.showAllLabel,
        index: -1
      }
    ];
    $(this.campaignList).each((index) => {
      let item = {
        label: this.campaignList[index][this.labelProperty],
        index: index
      };
      itemList.push(item);
    });
    return itemList;
  }

  protected onItemClick(item){
    console.log(`Click!`);
    console.log(item);
    this.selectedItemIndex = item.index + 1;
    if(item.index > -1) {
      this.changeFilter(item.index);
    }else{
      this.resetFilter();
    }
  }

  protected changeFilter(itemIndex){
    let newValue = this.campaignList[itemIndex][this.filterValueProperty];
    let result = this.filtersService.changeFilter(this.filterId, newValue);
    console.log(`Filter changed: ${result}`);
  }

  protected resetFilter(){
    this.filtersService.changeFilter(this.filterId, '');
  }

}
