import { Component, OnInit, Input } from '@angular/core';
import { Card } from 'src/app/interfaces/card.interface';
import { CardManagerService } from 'src/app/services/card-manager.service';
import { CardEditerComponent } from 'src/app/components/abstracts/card-editer/card-editer.component';

@Component({
  selector: 'app-card-workflow',
  templateUrl: './card-workflow.component.html',
  styleUrls: ['./card-workflow.component.scss']
})
export class CardWorkflowComponent extends CardEditerComponent implements OnInit {

  @Input()
  card: Card;

  protected workflowMenuOptions = {
    active: [
      {
        label: 'Pause',
        workflow: 'paused'
      },
      {
        lable: 'Terminate',
        workflow: 'terminated'
      }
    ],
    paused: [
      {
        label: 'Activate',
        workflow: 'active'
      }
    ]
  }

  constructor(cardManagerService: CardManagerService) {
    super(cardManagerService);
  }

  ngOnInit() {
  }

}
