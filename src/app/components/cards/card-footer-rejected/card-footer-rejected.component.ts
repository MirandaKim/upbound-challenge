import { Component, OnInit, Input } from '@angular/core';
import { Card } from 'src/app/interfaces/card.interface';
import { CardManagerService } from 'src/app/services/card-manager.service';

@Component({
  selector: 'app-card-footer-rejected',
  templateUrl: './card-footer-rejected.component.html',
  styleUrls: ['./card-footer-rejected.component.scss']
})
export class CardFooterRejectedComponent implements OnInit {

  /********************************************/
  /*   # Properties                          */
  /******************************************/

  /*************
  *  > Input   *
  *************/

  @Input()
  protected card: Card; // get the card data from parent component

  /***************
  *  > Configs   *
  ***************/

  protected cardIdKey: string = 'id'; // property of a Card object where the card's id is stored
  protected cardStatusKey: string = 'currentWorkflow'; // property of a Card object where the card's status is stored
  protected statusPendingValue: string = 'pending'; // Value of a card's status when the card is 'pending'--used for resubmitting card.

  /****************
  *  > Services   *
  ****************/

  protected cardManagerService: CardManagerService; // service for reading/updating card data

  /********************************************/
  /*   # Properties                          */
  /******************************************/

  constructor(cardManagerService: CardManagerService) {
    this.cardManagerService = cardManagerService;
  }

  /********************************************/
  /*   # Properties                          */
  /******************************************/

  ngOnInit() {}

  /********************************************/
  /*   # Protected                           */
  /******************************************/

  protected resubmitCard(){
    this.card[this.cardStatusKey] = this.statusPendingValue;
    this.cardManagerService.updateCards();
  }

  /********************************************/
  /*   # Events                              */
  /******************************************/

  protected onResubmitClick(){
    this.resubmitCard();
  }

}
