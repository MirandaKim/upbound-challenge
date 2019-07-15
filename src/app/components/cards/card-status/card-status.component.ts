import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Card } from 'src/app/interfaces/card.interface';

/**********************************************************/
/*                                                       */
/*   Card Status                                        */
/*                                                     */
/******************************************************/
/*

Card sub component: contains the card's status data (e.g. workflow, progress bar, ...)

**********  Some of the values are NOT currently
*  Note: *  determined by the card's data
**********  but by variables or logic.

*****************
*   Contents:   *
*****************

  # Properties
  # Constructor
  # On Init
  # User Events
  # Protected

******************/

@Component({
  selector: 'app-card-status',
  templateUrl: './card-status.component.html',
  styleUrls: ['./card-status.component.scss']
})
export class CardStatusComponent implements OnInit {

  /********************************************/
  /*   # Properties                          */
  /******************************************/

  @Input()
  public card: Card;

  @Input()
  public cardEditable: boolean = false;

  @Output()
  public menuToggled = new EventEmitter <boolean>();

  public perMonthValue: number = 5000;
  public perMonthCurrencySymbol: string = '$';

  public progressBarPercent: number = 0;

  public cardWorkflowProperty = 'currentWorkflow';
  public activeWorkflowValue = 'active';


  /********************************************/
  /*   # Constructor                         */
  /******************************************/

  constructor() { }

  /********************************************/
  /*   # On Init                             */
  /******************************************/

  ngOnInit() {
    this.setBarPercentage();
  }

  /********************************************/
  /*   # User Events                         */
  /******************************************/

  public onMenuToggle(isOpen: boolean){
    this.menuToggled.emit(isOpen);
  }

  /********************************************/
  /*   # Protected                           */
  /******************************************/

  /*
  Set Bar Percentage:
  Set the value displayed in the progress bar, if the currentWorkflow is active, set it to 100%.
  Else set it to 0%.
  */
  protected setBarPercentage(){
    this.progressBarPercent = this.card[this.cardWorkflowProperty] === this.activeWorkflowValue ? 100 : 0;
  }


}
