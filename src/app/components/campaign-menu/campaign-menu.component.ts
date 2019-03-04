import { Component, OnInit } from '@angular/core';
import { CampaignsService } from 'src/app/services/campaigns.service';
import { Campaign } from 'src/app/interfaces/campaign.interface';

@Component({
  selector: 'app-campaign-menu',
  templateUrl: './campaign-menu.component.html',
  styleUrls: ['./campaign-menu.component.scss']
})
export class CampaignMenuComponent implements OnInit {

  protected listItems;
  protected selectedItemIndex;

  protected campaignsService: CampaignsService;
  protected campaignList: Campaign[];

  constructor( campaignsService: CampaignsService) {
    this.campaignsService = campaignsService;
  }

  ngOnInit() {
    this.campaignList = this.getCampaignList();
    this.listItems = [
      {
        label: 'All Campaigns'
      },
      {
        label: 'Option 1'
      },
      {
        label: 'Option 2'
      },
      {
        label: 'Option 3'
      }
    ];
    this.selectedItemIndex = 0;
  }

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

}
