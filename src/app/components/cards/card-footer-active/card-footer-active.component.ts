import { Component, OnInit, Input } from '@angular/core';
import { Card } from 'src/app/interfaces/card.interface';

/**********************************************************/
/*                                                       */
/*   Card Footer (Active)                               */
/*                                                     */
/******************************************************/
/*

Footer component for a card when the card has an 'active' workflow.
This is to be used in place of the original card footer component, not in addition.

*****************
*   Contents:   *
*****************

  # Properties
  # Constructor
  # On Init

******************/

@Component({
  selector: 'app-card-footer-active',
  templateUrl: './card-footer-active.component.html',
  styleUrls: ['./card-footer-active.component.scss']
})
export class CardFooterActiveComponent implements OnInit {

  /********************************************/
  /*   # Properties                          */
  /******************************************/

  @Input()
  card: Card;

  @Input()
  totalRevenueCurrency: string = 'USD';

  /********************************************/
  /*   # Constructor                         */
  /******************************************/

  constructor() { }

  /********************************************/
  /*   # On Init                             */
  /******************************************/

  ngOnInit() {
  }

}
