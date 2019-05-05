import { Component, OnInit } from '@angular/core';
import { Dimensions } from 'src/app/interfaces/dimensions.interface';
import { DeviceStateService } from 'src/app/services/device-state.service';
import $ from 'jquery';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  protected sizeChangePt = 1000;
  protected deviceIsSmall = false;

  protected isFilterOpen = false;


  constructor(private deviceStateService: DeviceStateService) {}

  ngOnInit() {
    this.watchWindowSize();
  }

  private watchWindowSize(){
    let initialWindowSize = this.deviceStateService.getWindowSize();
    this.checkWindowChange(initialWindowSize);
    this.deviceStateService.windowResize.subscribe((windowSize: Dimensions) => {
        this.checkWindowChange(windowSize);
    })
  }

  protected checkWindowChange(windowSize: Dimensions){
    let isSmall = windowSize.width < this.sizeChangePt;
    if(isSmall !== this.deviceIsSmall){
      if(isSmall){
        this.windowChangeToSmall();
      }else{
        this.windowChangeToBig();
      }
    }
  }

  protected windowChangeToSmall(){
    this.deviceIsSmall = true;
    this.closeFilterDisplay();
  }

  protected windowChangeToBig(){
    this.deviceIsSmall = false;
    this.closeFilterDisplay();
  }

  protected toggleFiltersDisplay(){
    if(this.isFilterOpen){
      this.closeFilterDisplay();
    }else{
      this.openFilterDisplay();
    }
  }

  protected openFilterDisplay(){
    this.isFilterOpen = true;
    $('#header-filter-list').addClass('show');
    $('#header-filter-toggle').addClass('open');
  }

  protected closeFilterDisplay(){
    this.isFilterOpen = false;
    $('#header-filter-list').removeClass('show');
    $('#header-filter-toggle').removeClass('open');
  }


}
