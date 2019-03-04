import { Component, OnInit, Input } from '@angular/core';
import { Card } from 'src/app/interfaces/card.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  /********************************************/
  /*   # Properties                          */
  /******************************************/

  @Input() card: Card;

  public maxTitleStrLength = 55;
  public testTitle = "Create a site no Programming skills required in 2 weeks";


  protected cardEditable: boolean = false;
  protected cardMenuOpen: boolean = false;

  /********************************************/
  /*   # Constructor                         */
  /******************************************/

  constructor() { }

  /********************************************/
  /*   # On Init                             */
  /******************************************/

  ngOnInit() {

  }

  /********************************************/
  /*   # Protected                           */
  /******************************************/

  /**********************
  *  > On Mouse Enter   *
  **********************/

  protected onMouseEnter(){
    this.cardEditable = true;
  }

  /**********************
  *  > On Mouse Leave   *
  **********************/

  protected onMouseLeave(){
    this.cardEditable = false;
  }

  /****************************
  *  > On Menu Button Click   *
  ****************************/

  protected onMenuBottonClick(event){
    this.cardMenuOpen = event;
  }

}
