import { Injectable, EventEmitter, Output, OnDestroy } from '@angular/core';
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
    - Watch user first touch (subscribe to firstTouch)

*****************
*   Contents:   *
*****************

  # Properties
    > Window Size
    > Touch
    > Listeners
  # Constructor
  # Public
    > Get Window Size
    > Has Touch
    > Browser Detection
  # Private
    > Watch Window Size
    > Watch Touch Event
  # On Destroy

******************/

@Injectable({
  providedIn: 'root'
})
export class DeviceStateService implements OnDestroy{

  /********************************************/
  /*   # Properties                          */
  /******************************************/

  /*******************
  *  > Window Size   *
  *******************/

  protected windowSize: Dimensions;

  @Output()
  public windowResize = new EventEmitter<Dimensions>();

  /*************
  *  > Touch   *
  *************/

  protected waitingForTouchEvent: boolean = false;
  protected touchDetected: boolean = false;

  @Output()
  public firstTouch = new EventEmitter<TouchEvent>(); // touch event

  /*****************
  *  > Listeners   *
  *****************/

  protected windowListener: (e: any) => void; // resize event
  protected touchListener: (e: TouchEvent) => void;

  /********************************************/
  /*   # Constructor                         */
  /******************************************/

  constructor() {
    this.watchWindowSize();
    this.watchTouchEvent();
  }

  /********************************************/
  /*   # Public                              */
  /******************************************/

  /***********************
  *  > Get Window Size   *
  ***********************/

  /*
  Get Window Size
  What is the current window size of this device
  */
  public getWindowSize(){
    return this.windowSize;
  }

  /*****************
  *  > Has Touch   *
  *****************/

  /*
  Has Touch
  Has a user touch event been detected from this device
  */
  public hasTouch(){
    return this.touchDetected;
  }

  /*************************
  *  > Browser Detection   *
  *************************/

  public isEdge(): boolean{
    return navigator.userAgent.indexOf('Edge') >= 0;
  }

  public isChrome(): boolean {
    return navigator.userAgent.indexOf('Chrome') >= 0;
  }

  public isFirefox(): boolean {
    return navigator.userAgent.indexOf('Firefox') >= 0;
  }

  public isSafari(): boolean {
    return navigator.userAgent.indexOf('Safari') >= 0 && !this.isChrome();
  }

  /********************************************/
  /*   # Private                             */
  /******************************************/

  /*************************
  *  > Watch Window Size   *
  *************************/

  /*
  Watch Window Size
  Listen for window resize events, and let any listening components/services know
  a resize event has occured--providing them with the new device size.
  */
  private watchWindowSize(): void{
    this.windowSize = { // get the current window size
      height: window.innerHeight,
      width: window.innerWidth
    };
    /*
    Watch the window for a window resize event
    and emit an event whenever there is a new window size.
    */
    this.windowListener = (e: any) => {
      this.windowSize.height = e.target.innerHeight;
      this.windowSize.width = e.target.innerWidth;
      this.windowResize.emit(this.windowSize);
    };
    window.addEventListener('resize', this.windowListener, false); // trigger events when the window is resized
  }

  /*************************
  *  > Watch Touch Event   *
  *************************/

  /*
  Watch Touch Event
  Listen for the first touch event, and let any listening components/services
  know that touch is in use.
  This is only triggered once, then the event listener is remove.
  */
  private watchTouchEvent(){
    /*
    function to trigger on first user touch.
    Stored in this variable so we can reference within this class to remove the event.
    */
    this.touchListener = (e: TouchEvent) => {
      this.waitingForTouchEvent = false; // someone touched the screen--we are no longer waiting
      this.touchDetected = true; // a touch has been detected, yay!
      this.firstTouch.emit(e); // let listening components/services know someone touched the screen
      window.removeEventListener('touchstart', this.touchListener, false); // Remove the event listener
      delete this.touchListener; // delete this as we won't be needing it again.
    };
    this.waitingForTouchEvent = true; // we're officially waiting for a touch event to occur
    window.addEventListener('touchstart', this.touchListener, false);
  }

  /********************************************/
  /*   # On Destroy                          */
  /******************************************/

  ngOnDestroy(){
    window.removeEventListener('resize', this.windowListener, false); // remove the resize event listener
  }


}
