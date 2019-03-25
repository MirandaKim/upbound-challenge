import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-date-selector',
  templateUrl: './date-selector.component.html',
  styleUrls: ['./date-selector.component.scss']
})
export class DateSelectorComponent implements OnInit {

  protected today: Date;
  protected selectedDate: number = 0; // 0 is today, 1 is tomorrow, -1 is yesturday, and so on...

  constructor() { }

  ngOnInit() {
    this.setCurrentDate();
  }

  protected setCurrentDate(){
    this.today = new Date();
  }

}
