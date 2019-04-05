import { Component, OnInit, Input } from '@angular/core';
import { Card } from 'src/app/interfaces/card.interface';
import { CardManagerService } from 'src/app/services/card-manager.service';

@Component({
  selector: 'app-card-footer-rejected',
  templateUrl: './card-footer-rejected.component.html',
  styleUrls: ['./card-footer-rejected.component.scss']
})
export class CardFooterRejectedComponent implements OnInit {

  @Input()
  protected card: Card;
  protected cardIdKey: string = 'id'; // property of a Card object where the card's id is stored
  protected cardStatusKey: string = 'currentWorkflow'; // property of a Card object where the card's status is stored
  protected statusPendingValue: string = 'pending'; // Value of a card's status when the card is 'pending'--used for resubmitting card.

  protected cardManagerService: CardManagerService;

  constructor(cardManagerService: CardManagerService) {
    this.cardManagerService = cardManagerService;
  }

  ngOnInit() {}

  protected resubmitCard(){
    this.card[this.cardStatusKey] = this.statusPendingValue;
    this.cardManagerService.updateCards();
  }

  protected onResubmitClick(){
    this.resubmitCard();
  }

}
