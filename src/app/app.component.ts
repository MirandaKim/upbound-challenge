import { Component } from '@angular/core';
import { DeviceStateService } from 'src/app/services/device-state.service';
import $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  protected hasTouchClass = 'has-touch';
  protected bodySelector = 'body';

  constructor(private deviceStateService: DeviceStateService){
    this.watchForTouchEvent();
  }

  private watchForTouchEvent(){
    var touchListener = this.deviceStateService.firstTouch.subscribe((e: TouchEvent) => {
        $(this.bodySelector).addClass(this.hasTouchClass); 
        touchListener.unsubscribe();
    });
  }

}
