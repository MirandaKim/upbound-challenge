import { Component, OnInit } from '@angular/core';
import { CardsService } from 'src/app/services/cards.service';
import { Card } from 'src/app/interfaces/card.interface';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {

  /********************************************/
  /*   # Properties                          */
  /******************************************/

  protected cardList: any[] = [];

  protected resReceived = false;
  private cardsService: CardsService;

  /********************************************/
  /*   # Constructor                         */
  /******************************************/

  constructor(cardsService: CardsService) {
    this.cardsService = cardsService;
  }

  /********************************************/
  /*   # On Init                             */
  /******************************************/

  ngOnInit() {
    // this.cardList = this.getCards();
    this.cardList = this.testing();
  }

  /*
  TEST FUNCTION
  Dev note: this function is only for development purposes when API cannot be accessed.
  */
  testing() {
    let testCards = [
      {
        "campaignId": "CN201701182",
        "cardTitle": "Title 1",
        "cardDescription": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, ",
        "primaryMediaUrl": "https://loremflickr.com/750/400",
        "cardStartDate": "0001-01-01T00:00:00Z",
        "cardEndDate": "0001-01-01T00:00:00Z",
        "availableQuantity": 32,
        "likes": 10,
        "shares": 20,
        "views": 30,
        "subscribers": 0,
        "unSubscribers": 0,
        "open": 0,
        "discard": 0,
        "totalRevenue": 0,
        "listOfPlans": [
          {
            "price": { "amount": "47800", "currency": "JPY", "currencySymbol": "¥" }
          }
        ],
        "locations": [
          {
            "latitude": "",
            "longitude": "",
            "area": "",
            "city": "",
            "country": "",
            "placeId": "ChIJx8SRZhAEGTkRwsZ7Hq_dJPs",
            "description": "Seattle, Washington, USA"
          }
        ],
        "currentWorkflow": "paused",
        "campaignEndDate": "2017-02-28T18:59:59.999Z",
        "id": "c3d444c3d2774263ab93598fb0705374",
        "userId": "5d6117b9ae114c83bb53cfdd8c722e78",
        "createdAt": "2017-02-06T11:14:45.131Z",
        "updatedAt": "2017-02-06T11:16:44.344Z"
      },
      {
        "campaignId": "CN201701182",
        "cardTitle": "Title 2",
        "cardDescription": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, ",
        "primaryMediaUrl": "https://loremflickr.com/750/400",
        "cardStartDate": "0001-01-01T00:00:00Z",
        "cardEndDate": "0001-01-01T00:00:00Z",
        "availableQuantity": 32,
        "likes": 10,
        "shares": 20,
        "views": 30,
        "subscribers": 0,
        "unSubscribers": 0,
        "open": 0,
        "discard": 0,
        "totalRevenue": 0,
        "listOfPlans": [
          { "price": { "amount": 8900, "currency": "USD", "currencySymbol": "$" } }
        ],
        "locations": [
          {
            "latitude": "",
            "longitude": "",
            "area": "",
            "city": "",
            "country": "",
            "placeId": "ChIJx8SRZhAEGTkRwsZ7Hq_dJPs",
            "description": "Seattle, Washington, USA"
          }
        ],
        "currentWorkflow": "expired",
        "campaignEndDate": "2017-02-28T18:59:59.999Z",
        "id": "c3d444c3d2774263ab93598fb0705374",
        "userId": "5d6117b9ae114c83bb53cfdd8c722e78",
        "createdAt": "2017-02-06T11:14:45.131Z",
        "updatedAt": "2017-02-06T11:16:44.344Z"
      }
    ];
    return testCards;
  }

  /********************************************/
  /*   # Protected                           */
  /******************************************/

  /*****************
  *  > Get Cards   *
  *****************/
  /*
  Get Cards:
  Access the API to return a list of cards
  */

  protected getCards(): Card[]{
    let cardList: Card[];
    /*Subscribe to Cards Service*/
    this.cardsService.readAll().subscribe((res) => {
      /*
      Valid: check if the response has the property 'items',
      which should contain the cards. If the response is not valid,
      it is likely due to a 404.
      */
      let valid = res.hasOwnProperty('items');
      if(valid){
        cardList = res['items']; // get list of cards from response
      }else {
        cardList = []; // return empty array
      }
      this.resReceived = true; // let the component know the get request is complete
    }, (error) => {
      console.log(error);
      this.resReceived = true; // let the component know the get request is complete
    });
    return cardList;
  }

}
