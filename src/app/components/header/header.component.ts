import { Component, OnInit } from '@angular/core';
import $ from 'jquery';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  protected windowSize: {height: number, width: number};

  protected sizeChangePt = 1000;
  protected deviceIsSmall = false;

  protected isFilterOpen = false;

  constructor() {}

  ngOnInit() {
    this.watchWindowSize();
    this.checkWindowChange();
  }

  private watchWindowSize(){
    this.windowSize = {
      height: window.innerHeight,
      width: window.innerWidth
    };
    window.addEventListener('resize', (event: any) => {
      this.windowSize.height = event.target.innerHeight;
      this.windowSize.width = event.target.innerWidth;
      this.checkWindowChange();
    });
  }

  protected checkWindowChange(){
    let isSmall = this.windowSize.width < this.sizeChangePt;
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
