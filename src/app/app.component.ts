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

  protected hasTouchClass = 'has-touch';
  protected hasNoTouchClass = 'has-no-touch';
  protected waitingForTouchClass = 'waiting-for-touch';

  /********************************************/
  /*   # Constructor                         */
  /******************************************/

  constructor(private deviceStateService: DeviceStateService){
    this.watchForTouchEvent();
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

}
