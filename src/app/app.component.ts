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
  # Constructor
  # Private

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

  protected hasTouchClass = 'has-touch';
  protected bodySelector = 'body';

  /********************************************/
  /*   # Constructor                         */
  /******************************************/

  constructor(private deviceStateService: DeviceStateService){
    this.watchForTouchEvent();
  }

  /********************************************/
  /*   # Private                             */
  /******************************************/

  private watchForTouchEvent(){
    var touchListener = this.deviceStateService.firstTouch.subscribe((e: TouchEvent) => {
        $(this.bodySelector).addClass(this.hasTouchClass);
        touchListener.unsubscribe();
    });
  }

}
