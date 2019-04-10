import { Component, OnInit, Input } from '@angular/core';
import { Card } from 'src/app/interfaces/card.interface';

@Component({
  selector: 'app-card-workflow',
  templateUrl: './card-workflow.component.html',
  styleUrls: ['./card-workflow.component.scss']
})
export class CardWorkflowComponent implements OnInit {

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

  constructor() { }

  ngOnInit() {
  }

}
