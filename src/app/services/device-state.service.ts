import { Injectable, EventEmitter, Output } from '@angular/core';
import { Dimensions } from 'src/app/interfaces/dimensions.interface';

/**********************************************************/
/*                                                       */
/*   Device State Service (device-state.service.ts)     */
/*                                                     */
/******************************************************/
/*

  Watch the states of the divice/window and emit events as needed.

  Current functionality:
    - Watch window size (subscribe to windowResize)

*****************
*   Contents:   *
*****************

  # Properties
    > Window Size
  # Constructor
  # Public
    > Get Window Size
  # Private
    > Watch Window Size
  # On Destroy

******************/

@Injectable({
  providedIn: 'root'
})
export class DeviceStateService {

  /********************************************/
  /*   # Properties                          */
  /******************************************/

  /*******************
  *  > Window Size   *
  *******************/

  protected windowSize: Dimensions;

  @Output()
  public windowResize = new EventEmitter<Dimensions>();

  /********************************************/
  /*   # Constructor                         */
  /******************************************/

  constructor() {
    this.watchWindowSize();
  }

  /********************************************/
  /*   # Public                              */
  /******************************************/

  public getWindowSize(){
    return this.windowSize;
  }

  /********************************************/
  /*   # Private                             */
  /******************************************/

  private watchWindowSize(){
    this.windowSize = { // get the current window size
      height: window.innerHeight,
      width: window.innerWidth
    };
    /*
    Watch the window for a window resize event
    and emit an event whenever there is a new window size.
    */
    window.addEventListener('resize', (event: any) => {
      this.windowSize.height = event.target.innerHeight;
      this.windowSize.width = event.target.innerWidth;
      this.windowResize.emit(this.windowSize);
    });
  }


}
