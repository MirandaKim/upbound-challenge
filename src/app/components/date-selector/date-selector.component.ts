import { Component, OnInit } from '@angular/core';

/**********************************************************/
/*                                                       */
/*   Date Selector (date-selector.component.ts)         */
/*                                                     */
/******************************************************/
/*

  Loop through dates to create a date filter.

*********************************
*   This module is INCOMPLETE   *
*********************************

  - Logic to change the selected date has not been created @TODO: Loop through dates (see function shiftDate)
  - Logic for filtering cards based on the selected date has not been created @TODO: filter cards by selected date.

*****************
*   Contents:   *
*****************

  # Properties
    >
  # Constructor
  # On Init
  # Protected

******************/

@Component({
  selector: 'app-date-selector',
  templateUrl: './date-selector.component.html',
  styleUrls: ['./date-selector.component.scss']
})
export class DateSelectorComponent implements OnInit {

  /********************************************/
  /*   # Properties                          */
  /******************************************/

  protected today: Date;
  protected dayOffset: number = 0; // 0 is today, 1 is tomorrow, -1 is yesturday, and so on...
  protected dayCountdown: string = '1';

  protected selectedDate: Date;

  protected dayPronouns: string[] = [
    'Yesterday',
    'Today',
    'Tomorrow'
  ];

  /********************************************/
  /*   # Constructor                         */
  /******************************************/

  constructor() { }

  /********************************************/
  /*   # On Init                             */
  /******************************************/

  ngOnInit() {
    this.setCurrentDate();
  }

  /********************************************/
  /*   # Protected                           */
  /******************************************/

  /************************
  *  > Set Current Date   *
  ************************/

  /*
  Set Current Date
  Find today's date and use it as the initialy selected date.
  */
  protected setCurrentDate(): void{
    this.today = new Date();
    this.selectedDate = new Date();
  }

  /******************
  *  > Shift Date   *
  ******************/

  /*
  Shift Date:
  Change the currently selected date by the provided integer.
  Ex:
  shiftValue = 1 will change the currently selected date to the next day.
  shiftValue = -1 will change the currently selected date to the previous day.
  shiftValue = 10 will change the currently selected date to 10 days ahead.

  WARNING: This functionality is not complete.
  */
  protected shiftDate(shiftValue: number): void{
    this.dayOffset += shiftValue;
    this.setDayCountdown();
    console.log('Sorry, looping through dates is not availible at this time.');
  }

  /*************************
  *  > Set Day Countdown   *
  **************************/

  /*
  Set Day Countdown:

  Create as string value that represents the day difference between today's date
  and the currently selected date.
  */
  protected setDayCountdown(): void{
    let daysLeft = this.dayOffset + 1;
    if(daysLeft > 99){
      this.dayCountdown = '>99';
    }else if(daysLeft < 1){
      this.dayCountdown = '<1';
    }else{
      this.dayCountdown = daysLeft.toString();
    }
  }

}
