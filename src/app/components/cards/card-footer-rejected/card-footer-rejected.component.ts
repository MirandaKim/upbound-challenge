import { Component, OnInit, Input } from '@angular/core';
import { Card } from 'src/app/interfaces/card.interface';
import { CardManagerService } from 'src/app/services/card-manager.service';
import { CardeditorComponent } from 'src/app/components/abstracts/card-editor/card-editor.component';

/**********************************************************/
/*                                                       */
/*   Card Footer (Rejected)                             */
/*                                                     */
/******************************************************/
/*

Footer component for a card when the card has a 'rejected'/'declined' workflow.
This is to be used in place of the original card footer component, not in addition.

*****************
*   Contents:   *
*****************

  # Constructor
  # On Init
  # User Events

******************/

@Component({
  selector: 'app-card-footer-rejected',
  templateUrl: './card-footer-rejected.component.html',
  styleUrls: ['./card-footer-rejected.component.scss']
})
export class CardFooterRejectedComponent extends CardeditorComponent implements OnInit {

  /********************************************/
  /*   # Constructor                          */
  /******************************************/

  constructor(cardManagerService: CardManagerService) {
    super(cardManagerService);
  }

  /********************************************/
  /*   # On Init                             */
  /******************************************/

  ngOnInit() {}

  /********************************************/
  /*   # User Events                         */
  /******************************************/

  public onResubmitClick(){
    this.card[this.cardStatusKey] = this.statusPendingValue;
    this.resubmitCard();
  }

}
