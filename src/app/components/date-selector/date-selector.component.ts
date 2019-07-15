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

  - Logic for filtering cards based on the selected date has not been created
    @TODO: filter cards by selected date (use the provided Filters Service and Filterer Component).


****************
*   WARNING:   *
****************

  Looping through dates may not account for daylight savings, leap years, or other time/calendar anomalies.

*****************
*   Contents:   *
*****************

  # Properties
    > Today
    > Selected Date
    > Display Values
  # Constructor
  # On Init
  # User Events
    > Shift Date
  # Protected
    > Set Current Date
    > Set Day Countdown

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

  /*************
  *  > Today   *
  *************/

  public today: Date;

  /*********************
  *  > Selected Date   *
  *********************/

  public dayOffset: number = 0; // 0 is today, 1 is tomorrow, -1 is yesturday, and so on...
  public selectedDate: Date;

  /**********************
  *  > Display Values   *
  **********************/

  public dayCountdown: string = '1'; //represents the day difference between today's date and the currently selected date.
  public dayPronouns: string[] = [ // ORDER MATTERS!
    'Yesterday', // 0
    'Today',    // 1
    'Tomorrow' // 2
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
  /*   # User Events                         */
  /******************************************/

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

  WARNING: This functionality does not currently provide a filter for the list of cards.
  */
  public shiftDate(shiftValue: number): void{
    this.dayOffset += shiftValue;
    this.setDayCountdown();
    this.selectedDate = new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth(), (this.selectedDate.getDate() + shiftValue));
    console.warn('Sorry, filtering cards by the date value is not availible at this time.');
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
