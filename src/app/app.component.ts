import { Component } from '@angular/core';
import { DeviceStateService } from 'src/app/services/device-state.service';
import $ from 'jquery';

/**********************************************************/
/*                                                       */
/*   App (app.component.ts)                             */
/*                                                     */
/******************************************************/
/*

*****************
*   Contents:   *
*****************

  # Properties
    > Element Selectors
    > Style Classes
  # Constructor
  # Private
    > Watch For Touch
    > Handle Browsers

******************/

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  /********************************************/
  /*   # Properties                          */
  /******************************************/

  /*************************
  *  > Element Selectors   *
  *************************/

  protected bodySelector = 'body';

  /*********************
  *  > Style Classes   *
  *********************/

  /* Touch Device */
  protected hasTouchClass = 'has-touch';
  protected hasNoTouchClass = 'has-no-touch';
  protected waitingForTouchClass = 'waiting-for-touch';

  /* Browsers */

  protected browserIsEdgeClass = "browser-is-edge";
  protected browserIsChromeClass = "browser-is-chrome";

  /********************************************/
  /*   # Constructor                         */
  /******************************************/

  constructor(private deviceStateService: DeviceStateService){
    this.watchForTouchEvent();
    this.handleBrowsers();
  }

  /********************************************/
  /*   # Private                             */
  /******************************************/

  /***********************
  *  > Watch For Touch   *
  ***********************/

  private watchForTouchEvent(){
    /*
    Add initial classes to the body
    */
    let body = $(this.bodySelector);
    body.addClass(this.hasNoTouchClass);
    body.addClass(this.waitingForTouchClass);
    /*
    Listen for the first touch event.
    Once a touch event is detected,
    swap out the appropriate class names
    and unsubscribe to the event.
    */
    var touchListener = this.deviceStateService.firstTouch.subscribe((e: TouchEvent) => {
      body.removeClass(this.hasNoTouchClass);
      body.removeClass(this.waitingForTouchClass);
      body.addClass(this.hasTouchClass);
      touchListener.unsubscribe();
    });
  }

  /***********************
  *  > Handle Browsers   *
  ***********************/

  /*
  Handle Browsers:
  Handle any logic based on browser
  */
  private handleBrowsers(){
    /*Edge*/
    if(this.deviceStateService.isEdge()){
      this.handleBrowser_edge();
    }
    /*Chrome*/
    if(this.deviceStateService.isChrome()){
      this.handleBrowser_chrome();
    }
  }

  /*
  Handle Browser (Edge):
  Handle any logic for an Edge browser
  */
  private handleBrowser_edge(){
    $(this.bodySelector).addClass(this.browserIsEdgeClass);
  }

  /*
  Handle Browser (Chrome):
  Handle any logic for a Chrome browser
  */
  private handleBrowser_chrome(){
    $(this.bodySelector).addClass(this.browserIsChromeClass);
  }

}
