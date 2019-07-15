import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Card } from 'src/app/interfaces/card.interface';
import { CardManagerService } from 'src/app/services/card-manager.service';
import { CardeditorComponent } from 'src/app/components/abstracts/card-editor/card-editor.component';

/**********************************************************/
/*                                                       */
/*   Card Workflow Component (card-workflow.component.ts)
/*                                                     */
/******************************************************/
/*

Menu with a list of workflow options dependent on the card's current workflow value.
Clicking on an option will edit the card's currentWorkflow value to the selected option.

*****************
*   Contents:   *
*****************

  # Interfaces
    > Card Info
    > Event Emitters
    > States
    > Menu Options
  # Component
  # Properties
  # Constructor
  # User Events

******************/


/********************************************/
/*   # Interfaces                          */
/******************************************/

interface WorkflowOptions {
  [name: string]: WorkflowMenuOption[]
}

interface WorkflowMenuOption {
  label: string;
  workflow: string;
}

/********************************************/
/*   # Component                           */
/******************************************/

@Component({
  selector: 'app-card-workflow',
  templateUrl: './card-workflow.component.html',
  styleUrls: ['./card-workflow.component.scss']
})
export class CardWorkflowComponent extends CardeditorComponent implements OnInit {

  /********************************************/
  /*   # Properties                          */
  /******************************************/

  /*****************
  *  > Card Info   *
  *****************/

  @Input()
  public card: Card;

  @Input()
  public cardEditable: boolean = false;

  /**********************
  *  > Event Emitters   *
  **********************/

  @Output()
  menuToggle = new EventEmitter<boolean>();

  /**************
  *  > States   *
  **************/
  protected isMenuOpen: boolean = false;

  /********************
  *  > Menu Options   *
  ********************/

  protected workflowLabels = {
    saved: 'Saved',
    pending: 'Pending',
    active: 'Live',
    paused: 'Paused',
    expired: 'Expired',
    declined: 'Rejected',
    terminated: 'Terminated'
  }

  public workflowMenuOptions: WorkflowOptions = {
    active: [
      {
        label: 'Pause',
        workflow: 'paused'
      },
      {
        label: 'Terminate',
        workflow: 'terminated'
      }
    ],
    paused: [
      {
        label: 'Publish',
        workflow: 'active'
      }
    ],
    saved: [
      {
        label: 'Submit',
        workflow: 'pending'
      }
    ]
  }

  /********************************************/
  /*   # Constructor                         */
  /******************************************/

  constructor(cardManagerService: CardManagerService) {
    super(cardManagerService); // send card manager service object to parent class
  }

  /********************************************/
  /*   # On Init                             */
  /******************************************/

  ngOnInit() {}

  /********************************************/
  /*   # User Events                         */
  /******************************************/

  /*
  On Option Click
  Triggered when the user clicks one of the times in menu created by this component's template
  */
  protected onOptionClick(menuOption: WorkflowMenuOption){
    this.card[this.cardStatusKey] = menuOption.workflow;
    this.onOpenChange(false); // emit event for menu closing, otherwise if the menu disapears everyone will treat it as open.
    this.resubmitCard();
  }

  /*
  On Open Change
  Triggered when the user toggles the diplay of the menu.
  Note: this is so the parent card component knows not to exit out of 'editable'
        if this menu is still open.
  */
  protected onOpenChange(isOpen: boolean){
    this.isMenuOpen = isOpen;
    this.menuToggle.emit(this.isMenuOpen);
  }


}
