import { Input } from '@angular/core';
import { Card } from 'src/app/interfaces/card.interface';
import { CardManagerService } from 'src/app/services/card-manager.service';

/**********************************************************/
/*                                                       */
/*   Card editor                                        */
/*                                                     */
/******************************************************/
/*

Abstract class for components involved in editing/updating card data.

*****************
*   Contents:   *
*****************

  # Properties
  # Constructor
  # Protected

******************/

export abstract class CardeditorComponent {

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

  /********************************************/
  /*   # Constructor                         */
  /******************************************/

  constructor(protected cardManagerService: CardManagerService) { }

  /********************************************/
  /*   # Protected                           */
  /******************************************/

  protected resubmitCard(){
    this.cardManagerService.updateCards();
  }

}
