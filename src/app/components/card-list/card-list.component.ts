import { Component, OnInit } from '@angular/core';
import { CardsService } from 'src/app/services/cards.service';
import { Card } from 'src/app/interfaces/card.interface';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {

  protected cardList: any = [];

  protected resReceived = false;
  private cardsService: CardsService;

  constructor(cardsService: CardsService) {
    this.cardsService = cardsService;
  }

  ngOnInit() {
    this.getCards();
  }


  getCards(){
    console.log(`Retrieving cards from card list component`);
    this.cardsService.getAllItems().subscribe((res) => {
      let valid = res.hasOwnProperty('items');
      if(valid){
        this.cardList = res['items'];
      }else {
        this.cardList = [];
      }
      this.resReceived = true;
      console.log(`Cards received`);
      console.log(this.cardList);
    }, (error) => {
      console.log(error);
      this.resReceived = true;
    });
  }

}
