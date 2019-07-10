import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Card } from 'src/app/interfaces/card.interface';
import { CardeditorComponent } from 'src/app/components/abstracts/card-editor/card-editor.component';
import { CardManagerService } from 'src/app/services/card-manager.service';

/**********************************************************/
/*                                                       */
/*   Card Menu                                          */
/*                                                     */
/******************************************************/
/*

  Menu providing options/links for individual cards (e.g. edit, publish...)

  INCOMPLETE:
  Some of the card menu features have not been completed. 

*****************
*   Contents:   *
*****************

  # Interfaces
  # Component
  # Properties
    > Menu Events
    > Card
    > Menu Item
  # Constructor
  # On Init
  # Protected
    > Disabled Checks
    > On Open Change
    > On Item Click
  # Private
    > Publish Card
    > Share Card
    > Delete Card

******************/

/********************************************/
/*   # Interfaces                          */
/******************************************/

interface cardMenuItem {
  label: string;
  icon: string;
  classes: string;
  disabled?: boolean;
  destination?: string;
  onClickCallback?: ()=>void;
}

/********************************************/
/*   # Component                           */
/******************************************/

@Component({
  selector: 'app-card-menu',
  templateUrl: './card-menu.component.html',
  styleUrls: ['./card-menu.component.scss']
})
export class CardMenuComponent extends CardeditorComponent implements OnInit {

  /********************************************/
  /*   # Properties                          */
  /******************************************/

  /*******************
  *  > Menu Events   *
  *******************/

  @Output()
  menuToggle = new EventEmitter<boolean>();
  public isMenuOpen = false;

  /************
  *  > Card   *
  ************/

  @Input()
  card: Card;
  @Input()
  cardSelectorId: string;

  /******************
  *  > Menu Items   *
  ******************/

  protected listItems: cardMenuItem[] = [];

  /********************************************/
  /*   # Constructor                         */
  /******************************************/

  constructor(cardManagerService: CardManagerService) {
    super(cardManagerService);
  }

  /********************************************/
  /*   # On Init                             */
  /******************************************/

  ngOnInit() {
    /*
    Set list of menu items
    */
    this.listItems = [
      {
        label: 'Edit',
        icon: 'pencil-paper',
        classes: '',
        destination: '/edit?id=' + this.card[this.cardIdKey]
      },
      {
        label: 'Publish',
        icon: 'check-circle',
        classes: '',
        disabled: this.isPublishDisabled(), // check if the workflow allows the card to be published
        onClickCallback: () => { // function callback triggered when this button is clicked
          this.publishCard();
        }
      },
      {
        label: 'Share',
        icon: 'share',
        classes: '',
        onClickCallback: () => { // function callback triggered when this button is clicked
          this.shareCard();
        }
      },
      {
        label: 'Delete',
        icon: 'trash',
        classes: '',
        onClickCallback: () => { // function callback triggered when this button is clicked
          this.deleteCard();
        }
      }
    ];
  }

  /********************************************/
  /*   # Protected                           */
  /******************************************/

  /***********************
  *  > Disabled Checks   *
  ***********************/

  /*
  Is Publish Disabled
  Check if the current workflow of the card allows for the card to published by the user.
  */
  protected isPublishDisabled(){
    let isAble = [ // list of workflows that allow for the card to be published
      'saved',
      'paused'
    ]
    /*
    If the current workflow matches one of the the allowed workflows, return FALSE (not disabled),
    else return true (is disabled)
    */
    if(isAble.indexOf(this.card[this.cardStatusKey]) > -1) return false;
    return true;
  }

  /**********************
  *  > On Open Change   *
  **********************/

  /*
  On Open Change
  On the bootstrap event that the dropdown menu's open state has changed,
  set the new value within this component and emit the new value to let
  the parent component know.
  */

  protected onOpenChange(isOpen: boolean){
    this.isMenuOpen = isOpen;
    this.menuToggle.emit(this.isMenuOpen);

  }

  /*********************
  *  > On Item Click   *
  *********************/

  /*
  On Item Click
  Event when the menu item is clicked by the user.
  */
  protected onItemClick(item: cardMenuItem){
    /* Trigger the item's callback function if it exists*/
    if(item.onClickCallback) item.onClickCallback();
  }

  /********************************************/
  /*   # Private                             */
  /******************************************/

  /********************
  *  > Publish Card   *
  ********************/

  /*
  Publish Card
  Change the current workflow of the card to 'pending'
  and send the updated card to the API.
  */
  private publishCard(){
    this.card[this.cardStatusKey] = this.statusPendingValue;
    this.resubmitCard();
  }

  /******************
  *  > Share Card   *
  ******************/

  private shareCard(){
    console.warn('Sorry, share card is not available at this time.');
  }

  /*******************
  *  > Delete Card   *
  *******************/

  private deleteCard(){
    console.warn('Sorry, delete card is not available at this time.');
  }

}
