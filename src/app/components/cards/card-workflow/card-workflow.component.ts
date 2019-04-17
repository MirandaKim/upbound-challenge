import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Card } from 'src/app/interfaces/card.interface';
import { CardManagerService } from 'src/app/services/card-manager.service';
import { CardEditerComponent } from 'src/app/components/abstracts/card-editer/card-editer.component';

interface WorkFlowMenuOption {
  label: string;
  workflow: string;
}

@Component({
  selector: 'app-card-workflow',
  templateUrl: './card-workflow.component.html',
  styleUrls: ['./card-workflow.component.scss']
})
export class CardWorkflowComponent extends CardEditerComponent implements OnInit {

  @Input()
  card: Card;

  @Input()
  cardEditable: boolean = false;

  @Output()
  menuToggle = new EventEmitter<boolean>();
  protected isMenuOpen: boolean = false;

  protected workflowMenuOptions = {
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
        label: 'Activate',
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

  constructor(cardManagerService: CardManagerService) {
    super(cardManagerService);
  }

  ngOnInit() {
  }

  protected onOptionClick(menuOption: WorkFlowMenuOption){
    this.card[this.cardStatusKey] = menuOption.workflow;
    this.onOpenChange(false); // emit event for menu closing, otherwise if the menu disapears everyone will treat it as open.
    this.resubmitCard();
  }

  protected onOpenChange(isOpen: boolean){
    this.isMenuOpen = isOpen;
    this.menuToggle.emit(this.isMenuOpen);
  }


}
