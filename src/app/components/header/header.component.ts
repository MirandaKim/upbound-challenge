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
    this.deviceIsSmall = this.windowSize.width < this.sizeChangePt;
  }

  protected toggleFiltersDisplay(){
    this.isFilterOpen = !this.isFilterOpen;
    $('#header-filter-list').toggleClass('show');
    $('#header-filter-toggle').toggleClass('open');
  }


}
