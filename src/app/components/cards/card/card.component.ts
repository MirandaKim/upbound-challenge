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

  public testTitle = "Create a site no Programming skills required in 2 weeks.";

  protected cardEditable: boolean = false;
  protected cardMenusOpenCt: number = 0;

  /*******************
  *  > Lazy Images   *
  *******************/

  protected lazyLoadOffset: number = 300; // how far before the image reaches the viewport will it load.

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

  protected onMenuBottonClick(isOpen: boolean){
    this.menuIsToggled(isOpen);
  }

  protected onStatusMenuButtonClick(isOpen: boolean){
    this.menuIsToggled(isOpen);
  }

  /********************************************/
  /*   # Private                             */
  /******************************************/

  private menuIsToggled(isOpen: boolean){
    if(isOpen){
      this.cardMenusOpenCt ++;
    }else{
      this.cardMenusOpenCt --;
    }
  }
}
