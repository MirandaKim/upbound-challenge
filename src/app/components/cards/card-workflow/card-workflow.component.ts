import { Component, OnInit, Input } from '@angular/core';
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
    this.resubmitCard();
  }

}
