import { Component, OnInit } from '@angular/core';
import { Dimensions } from 'src/app/interfaces/dimensions.interface';
import { DeviceStateService } from 'src/app/services/device-state.service';
import $ from 'jquery';

/**********************************************************/
/*                                                       */
/*   Header (header.component.ts)                       */
/*                                                     */
/******************************************************/
/*

  Site header component. Contains the main navigation for the site.


  ** Different Headers for Different Sizes **

  Currently, the component's logic has a variable change based on the width of the window/device.
  This variable (this.deviceIsSmall) can be used in the component's template to change
  which chunk of HTML is being displayed to the user.

*****************
*   Contents:   *
*****************

  # Properties
    > Device
    > Filter Dropdown
  # Constructor
  # Protected
    > Window Sizing
    > Toggle Filter Display

******************/

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  /********************************************/
  /*   # Properties                          */
  /******************************************/

  /**************
  *  > Device   *
  **************/

  public deviceIsSmall: boolean = false; // is the device's width currently smaller than the sizeChangePt?
  protected sizeChangePt: number = 1000; // (pixels) the point at which the device is considered small or not small.

  /***********************
  *  > Filter Dropdown   *
  ***********************/

  protected isFilterDropdownOpen: boolean = false; // is the filter dropdown window open?

  /***********************
  *  > Header Elements   *
  ***********************/

  protected filterListSelector: string = '#header-filter-list';
  protected filterListToggleSelector: string = '#header-filter-toggle';

  protected showClass: string = 'show';
  protected openClass: string = 'open';

  /********************************************/
  /*   # Constructor                         */
  /******************************************/

  constructor(private deviceStateService: DeviceStateService) {}

  /********************************************/
  /*   # On Init                             */
  /******************************************/

  ngOnInit() {
    this.watchWindowSize();
  }

  /********************************************/
  /*   # Protected                           */
  /******************************************/

  /*********************
  *  > Window Sizing   *
  *********************/

  /*
  Watch Window Size:
  Get the initial window size,
  then watch for a window resize event and check if any changes should be handled.
  */
  protected watchWindowSize(): void{
    let initialWindowSize = this.deviceStateService.getWindowSize(); // get current widow size
    this.checkWindowChange(initialWindowSize);
    this.deviceStateService.windowResize.subscribe((windowSize: Dimensions) => {
        this.checkWindowChange(windowSize);
    })
  }

  /*
   Check Window Change:
   If the window size has passed the size change point from either direction,
   handle the logic for the new size change.
  */
  protected checkWindowChange(windowSize: Dimensions): void{
    let isSmall = windowSize.width < this.sizeChangePt;
    if(isSmall !== this.deviceIsSmall){
      if(isSmall){
        this.windowChangeToSmall();
      }else{
        this.windowChangeToBig();
      }
    }
  }

  /*
  Window Change to Small:
    - Let the template know the device is now small.
    - Close the filter display (prevent funny display behavior)
  */
  protected windowChangeToSmall(): void{
    this.deviceIsSmall = true;
    this.closeFilterDisplay();
  }

  /*
  Window Change to Big:
    - Let the template know the device is now big.
    - Close the filter display (prevent funny display behavior if resized back to small)
  */
  protected windowChangeToBig(): void{
    this.deviceIsSmall = false;
    this.closeFilterDisplay();
  }

  /*****************************
  *  > Toggle Filter Display   *
  *****************************/

  /*
  Toggle Filter Display
  Toggle the display of the dropdown filter list.
  */
  protected toggleFiltersDisplay(): void{
    if(this.isFilterDropdownOpen){
      this.closeFilterDisplay();
    }else{
      this.openFilterDisplay();
    }
  }

  /*
  Open Filter Display
  Display the filter list by adding classes to header elements.
  */
  protected openFilterDisplay(): void{
    this.isFilterDropdownOpen = true;
    $(this.filterListSelector).addClass(this.showClass);
    $(this.filterListToggleSelector).addClass(this.openClass);
  }

  /*
  Close Filter Display
  Hide the filter list by removing classes from header elements.
  */
  protected closeFilterDisplay(): void{
    this.isFilterDropdownOpen = false;
    $(this.filterListSelector).removeClass(this.showClass);
    $(this.filterListToggleSelector).removeClass(this.openClass);
  }


}
