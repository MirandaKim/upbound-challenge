import { Component, OnInit, Input } from '@angular/core';
import { Card } from 'src/app/interfaces/card.interface';
import { CardManagerService } from 'src/app/services/card-manager.service';
import { CardEditerComponent } from 'src/app/components/abstracts/card-editer/card-editer.component';

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

  # Properties
  # Constructor
  # On Init

******************/

@Component({
  selector: 'app-card-footer-rejected',
  templateUrl: './card-footer-rejected.component.html',
  styleUrls: ['./card-footer-rejected.component.scss']
})
export class CardFooterRejectedComponent extends CardEditerComponent implements OnInit {

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
  /*   # Events                              */
  /******************************************/

  protected onResubmitClick(){
    this.card[this.cardStatusKey] = this.statusPendingValue;
    this.resubmitCard();
  }

}
