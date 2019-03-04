import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-card-menu',
  templateUrl: './card-menu.component.html',
  styleUrls: ['./card-menu.component.scss']
})
export class CardMenuComponent implements OnInit {

  /********************************************/
  /*   # Properties                          */
  /******************************************/

  @Output()
  menuToggle = new EventEmitter<boolean>();
  public isMenuOpen = false;

  @Input()
  cardTitle: string;
  @Input()
  cardId: string;

  @Input()
  cardSelectorId: string;

  protected listItems: any[];

  /********************************************/
  /*   # Constructor                         */
  /******************************************/

  constructor() { }

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
        destination: '#'
      },
      {
        label: 'Publish',
        icon: 'check-circle',
        classes: '',
        destination: '#'
      },
      {
        label: 'Share',
        icon: 'share',
        classes: '',
        destination: '#'
      },
      {
        label: 'Delete',
        icon: 'trash',
        classes: '',
        destination: '#'
      }
    ];
  }

  /********************************************/
  /*   # Protected                           */
  /******************************************/

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


}
