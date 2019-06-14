import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Card } from 'src/app/interfaces/card.interface';

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
  card: Card;

  @Input()
  cardEditable: boolean = false;

  @Output()
  menuToggled = new EventEmitter <boolean>();

  protected perMonthValue: number = 5000;
  protected perMonthCurrencySymbol: string = '$';

  protected progressBarPercent: number = 0;

  private cardWorkflowProperty = 'currentWorkflow';
  private activeWorkflowValue = 'active';


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

  protected setBarPercentage(){
    this.progressBarPercent = this.card[this.cardWorkflowProperty] === this.activeWorkflowValue ? 100 : 0;
  }

  protected onMenuToggle(isOpen: boolean){
    this.menuToggled.emit(isOpen);
  }

}
