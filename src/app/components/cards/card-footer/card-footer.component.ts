import { Component, OnInit, Input } from '@angular/core';
import { Card } from 'src/app/interfaces/card.interface';

/**********************************************************/
/*                                                       */
/*   Card Footer (card-footer.component.ts)             */
/*                                                     */
/******************************************************/
/*

Sub component of card: contains footer data for card.

*****************
*   Contents:   *
*****************

  # Properties
  # Constructor
  # On Init

******************/

@Component({
  selector: 'app-card-footer',
  templateUrl: './card-footer.component.html',
  styleUrls: ['./card-footer.component.scss']
})
export class CardFooterComponent implements OnInit {

  /********************************************/
  /*   # Properties                          */
  /******************************************/

  @Input()
  public card: Card;

  /********************************************/
  /*   # Constructor                         */
  /******************************************/

  constructor() { }

  /********************************************/
  /*   # On Init                             */
  /******************************************/

  ngOnInit() {}

}
