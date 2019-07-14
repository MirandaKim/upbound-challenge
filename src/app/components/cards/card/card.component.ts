import { Component, OnInit, Input } from '@angular/core';
import { Card } from 'src/app/interfaces/card.interface';

/**********************************************************/
/*                                                       */
/*   Card                                               */
/*                                                     */
/******************************************************/
/*

Componet for a single card.

*****************
*   Contents:   *
*****************

  # Properties
    > Card Data
    > Card States
    > Lazy Images
  # Constructor
  # On Init
  # User Events
    > On Mouse Enter
    > On Mouse Leave
    > On Menu Button Click
  # Private
    > Menu is Toggled

******************/

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  /********************************************/
  /*   # Properties                          */
  /******************************************/

  /*****************
  *  > Card Data   *
  *****************/

  @Input()
  public card: Card;

  /*******************
  *  > Card States   *
  *******************/

  public cardEditable: boolean = false;
  public cardMenusOpenCt: number = 0;

  /*******************
  *  > Lazy Images   *
  *******************/

  public lazyLoadOffset: number = 300; // how far before the image reaches the viewport will it load.

  /********************************************/
  /*   # Constructor                         */
  /******************************************/

  constructor() { }

  /********************************************/
  /*   # On Init                             */
  /******************************************/

  ngOnInit() {}

  /********************************************/
  /*   # User Events                         */
  /******************************************/

  /**********************
  *  > On Mouse Enter   *
  **********************/

  public onMouseEnter(){
    this.cardEditable = true;
  }

  /**********************
  *  > On Mouse Leave   *
  **********************/

  public onMouseLeave(){
    this.cardEditable = false;
  }

  /****************************
  *  > On Menu Button Click   *
  ****************************/

  public onMenuBottonClick(isOpen: boolean){
    this.menuIsToggled(isOpen);
  }

  public onStatusMenuButtonClick(isOpen: boolean){
    this.menuIsToggled(isOpen);
  }

  /********************************************/
  /*   # Private                             */
  /******************************************/

  /***********************
  *  > Menu is Toggled   *
  ***********************/

  private menuIsToggled(isOpen: boolean){
    if(isOpen){
      this.cardMenusOpenCt ++;
    }else{
      this.cardMenusOpenCt --;
    }
  }
}
