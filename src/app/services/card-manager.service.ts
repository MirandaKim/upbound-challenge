import { Injectable, EventEmitter, Output } from '@angular/core';
import { CardsService } from 'src/app/services/cards.service';
import { Card } from 'src/app/interfaces/card.interface';
import { CrudResponse } from 'src/app/interfaces/crud-response.interface';
import { isDevMode } from '@angular/core';

/**********************************************************/
/*                                                       */
/*   Card Manager Service                               */
/*                                                     */
/******************************************************/
/*

Services for getting and updating the list of cards.
The idea is to subscribe to the card data, then when something needs to be changed/updated
modify the values in the referene to the list of cards, then trigger this object's updateCards() method.


****************
*   Testing:   *
****************

- NOTE: When the testing property is set to true and
  the site is running in development mode (not production)
  a list of test cards will be used for the list of cards
  when the API can't be accessed. (see method this.getTestData() for the JSON data)

*****************
*   Contents:   *
*****************

  # Properties
    > Event Emitters
    > Configs
    > Card List
    > States
    > Services
    > Testing Config
  # Constructor
  # Public
    > Get Cards
    > Update Cards
  # Protected
    > Access Cards
    > On Card List Received
  # For Testing

******************/


@Injectable({
  providedIn: 'root'
})
export class CardManagerService {

  /********************************************/
  /*   # Properties                          */
  /******************************************/

  /**********************
  *  > Event Emitters   *
  **********************/

  @Output()
  cardListReceived = new EventEmitter<Card[]>(); // Watch event for when a new/updated list of cards is received
  @Output()
  cardsUpdating = new EventEmitter<number>();

  /***************
  *  > Configs   *
  ***************/

  protected cardIdProperty = 'id'; // property under which the unique id value of a card is stored

  /*****************
  *  > Card List   *
  *****************/

  protected cardList: Card[] = []; // List of card data

  /**************
  *  > States   *
  **************/

  protected apiResponseReceived: boolean = false; // has data been returned from the API yet?
  protected waitingCt: number = 0; // number of services the component is currently waiting on

  /****************
  *  > Services   *
  ****************/

  protected cardsService: CardsService; // CRUD service for accessing list of card data

  /**********************
  *  > Testing Config   *
  **********************/

  private testResponseDelay: number = 0; // delay the return of data by the given milliseconds, this is to mimic processing time.
  private testing: boolean = true; // is the site being tested (i.e. should test data be allowed to display)
  private updateResDelayTime: number = 5000;

  /********************************************/
  /*   # Constructor                         */
  /******************************************/

  constructor(
    cardsService: CardsService // CRUD service for card data
  ) {
    this.cardsService = cardsService;
    this.accessCards(); // get a list of cards from the API, via a CRUD service
  }

  /********************************************/
  /*   # Public                              */
  /******************************************/

  /*****************
  *  > Get Cards   *
  *****************/

  /*
  Get Cards
  Returns the list of cards stored in the instance of this class
  */
  public getCards(): Card[]{
    return this.cardList;
  }

  /*
  Get Card By Id
  Return a card object with the matching id.
  Returns undefined if no card exists by that id
  */
  public getCardById(id: string): Card | undefined {
    let cardIndex = this.findCardIndexByPropValue(this.cardIdProperty, id);
    return this.cardList[id];
  }

  /********************
  *  > Update Cards   *
  ********************/

  /*
  Update Cards
  Use the card list of the instance of this class to update the card list data from the API via a CRUD service.
  Once the card data is updated, the cardListReceived event will be emitted with the updated list of cards.

  WARNING: At this time the card data may be managed by a single JSON file.
           Each update may override the entire file of cards.
  */
  public updateCards(): void{
    this.cardsAreUpdating(true);
    this.cardsService.updateAll(this.cardList).subscribe((res: CrudResponse) => {
      if(res.items){
        this.cardList = res.items;
      }
      setTimeout(() =>{
        this.onCardListReceived(); // Emit an event for the updated list of cards
      }, this.updateResDelayTime);
    }, (error) => {
      console.error(error);
      setTimeout(() => {
        this.onCardListReceived();
      }, this.updateResDelayTime);
    });
  }

  /*
  Update Card
  Pass in the updated version of a card.
  This will update the full list and send the modified version through the API via a CRUD service.
  Once updated, the cardListReceived event will be emitted.
  */
  public updateCard(card: Card): boolean{
    let cardId = card[this.cardIdProperty];
    let index = this.findCardIndexByPropValue(this.cardIdProperty, cardId);
    if(index > -1){
      this.cardList[index] = card;
      this.updateCards();
      return true;
    }
    return false;
  }

  /********************************************/
  /*   # Protected                           */
  /******************************************/

  /********************
  *  > Access Cards   *
  ********************/

  /*
  Access Cards
  Read the full list of cards from the API via the CRUD service.
  Once returned, the list of cards will be stored within the instance of this class.
  A reference to the stored list of cards will be passed out to any watching
  services/components via the 'cardListReceived' event emitter.
  */
  protected accessCards(){
    this.cardsAreUpdating(true);
    /*Subscribe to Cards Service*/
    this.cardsService.readAll().subscribe((res: CrudResponse) => {
      /*
      Valid: check if the response has the property 'items',
      which should contain the cards. If the response is not valid,
      it is likely due to a 404.
      */
      if(res.items){
        this.cardList = res.items;// get list of cards from response
      }
      this.onCardListReceived(); // trigger card list received event
    }, (error) => {
      console.error(error);
      /*
      If testing is set to true & site is in dev mode,
      emit a list of test data,
      else emit an empty array.
      */
      if(this.testing && isDevMode()){
        this.cardList = this.getTestData(); // if testing is set to true, use the test card values.
        setTimeout(() => {
          this.onCardListReceived(); // emit test data
        }, this.testResponseDelay);
      }else{
        this.cardList = [];
        this.onCardListReceived(); // emit empty array
      }
    });
  }

  /*****************************
  *  > On Card List Received   *
  *****************************/

  /*
  On Card List Received
  Trigger the event emitter to send the card list to any watching services/components.
  */
  protected onCardListReceived (){
    this.apiResponseReceived = true;
    this.cardsAreUpdating(false);
    this.cardListReceived.emit(this.cardList);
  }

  /********************************************/
  /*   # Private                             */
  /******************************************/

  /*
  Find Card Index By Prop Value
  Return the index of the FIRST card with the matching property/value pair.
  If no match is found, -1 will be returned.
  */
  private findCardIndexByPropValue(prop, value){
    let index = -1;
    for (let i=0; i<this.cardList.length; i++){
      if(value === this.cardList[i][prop]){
        index = i;
        break;
      }
    }
    return index;
  }

  /*
  Cards Are Updating

  */
  private cardsAreUpdating(isUpdating: boolean){
    if(isUpdating){
      this.waitingCt++;
      this.cardsUpdating.emit(this.waitingCt);
    }else{
      this.waitingCt--;
      this.cardsUpdating.emit(this.waitingCt);
    }

  }

  /********************************************/
  /*   # For Testing                         */
  /******************************************/
  /*
  Get Test Data:
  <<< TEST FUNCTION >>>
  Dev note: this function is only for development purposes when API cannot be accessed.
  */
  private getTestData() {
    let testCards = `[
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
        "id": "c3d444c3d2774263ab93598fb0705371",
        "userId": "5d6117b9ae114c83bb53cfdd8c722e78",
        "createdAt": "2017-02-06T11:14:45.131Z",
        "updatedAt": "2017-02-06T11:16:44.344Z"
      },
      {
        "campaignId": "CN201701182",
        "cardTitle": "Title 2",
        "cardDescription": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, ",
        "primaryMediaUrl": "https://loremflickr.com/750/401",
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
        "id": "c3d444c3d2774263ab93598fb07053742",
        "userId": "5d6117b9ae114c83bb53cfdd8c722e78",
        "createdAt": "2017-02-06T11:14:45.131Z",
        "updatedAt": "2017-02-06T11:16:44.344Z"
      },
      {
        "campaignId": "CN201701182!!",
        "cardTitle": "Title 1",
        "cardDescription": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, ",
        "primaryMediaUrl": "https://loremflickr.com/750/402",
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
        "currentWorkflow": "declined",
        "campaignEndDate": "2017-02-28T18:59:59.999Z",
        "id": "c3d444c3d2774263ab93598fb0705373",
        "userId": "5d6117b9ae114c83bb53cfdd8c722e78",
        "createdAt": "2017-02-06T11:14:45.131Z",
        "updatedAt": "2017-02-06T11:16:44.344Z"
      },
      {
        "campaignId": "CN201701!",
        "cardTitle": "Title 1",
        "cardDescription": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, ",
        "primaryMediaUrl": "https://loremflickr.com/750/403",
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
        "currentWorkflow": "active",
        "campaignEndDate": "2017-02-28T18:59:59.999Z",
        "id": "c3d444c3d2774263ab93598fb0705374",
        "userId": "5d6117b9ae114c83bb53cfdd8c722e78",
        "createdAt": "2017-02-06T11:14:45.131Z",
        "updatedAt": "2017-02-06T11:16:44.344Z"
      },
      {
        "campaignId": "CN201701!",
        "cardTitle": "Title 1",
        "cardDescription": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, ",
        "primaryMediaUrl": "https://loremflickr.com/750/404",
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
        "currentWorkflow": "active",
        "campaignEndDate": "2017-02-28T18:59:59.999Z",
        "id": "c3d444c3d2774263ab93598fb0705375",
        "userId": "5d6117b9ae114c83bb53cfdd8c722e78",
        "createdAt": "2017-02-06T11:14:45.131Z",
        "updatedAt": "2017-02-06T11:16:44.344Z"
      },
      {
        "campaignId": "CN201701!",
        "cardTitle": "Title 1",
        "cardDescription": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, ",
        "primaryMediaUrl": "https://loremflickr.com/750/405",
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
        "currentWorkflow": "active",
        "campaignEndDate": "2017-02-28T18:59:59.999Z",
        "id": "c3d444c3d2774263ab93598fb0705376",
        "userId": "5d6117b9ae114c83bb53cfdd8c722e78",
        "createdAt": "2017-02-06T11:14:45.131Z",
        "updatedAt": "2017-02-06T11:16:44.344Z"
      },
      {
        "campaignId": "CN201701182",
        "cardTitle": "title--3",
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
        "currentWorkflow": "active",
        "campaignEndDate": "2017-02-28T18:59:59.999Z",
        "id": "c3d444c3d2774263ab93598fb0705377",
        "userId": "5d6117b9ae114c83bb53cfdd8c722e78",
        "createdAt": "2017-02-06T11:14:45.131Z",
        "updatedAt": "2017-02-06T11:16:44.344Z"
      },
      {
        "campaignId": "CN201701188",
        "cardTitle": "title--4",
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
        "currentWorkflow": "active",
        "campaignEndDate": "2017-02-28T18:59:59.999Z",
        "id": "c3d444c3d2774263ab93598fb0705378",
        "userId": "5d6117b9ae114c83bb53cfdd8c722e78",
        "createdAt": "2017-02-06T11:14:45.131Z",
        "updatedAt": "2017-02-06T11:16:44.344Z"
      },
      {
        "campaignId": "CN201701188",
        "cardTitle": "title--5",
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
            "price": { "amount": "3500", "currency": "CAD", "currencySymbol": "$" }
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
        "currentWorkflow": "terminated",
        "campaignEndDate": "2017-02-28T18:59:59.999Z",
        "id": "c3d444c3d2774263ab93598fb0705379",
        "userId": "5d6117b9ae114c83bb53cfdd8c722e78",
        "createdAt": "2017-02-06T11:14:45.131Z",
        "updatedAt": "2017-02-06T11:16:44.344Z"
      },
      {
        "campaignId": "CN201701188",
        "cardTitle": "title--6",
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
        "currentWorkflow": "saved",
        "campaignEndDate": "2017-02-28T18:59:59.999Z",
        "id": "c3d444c3d2774263ab93598fb0705310",
        "userId": "5d6117b9ae114c83bb53cfdd8c722e78",
        "createdAt": "2017-02-06T11:14:45.131Z",
        "updatedAt": "2017-02-06T11:16:44.344Z"
      }
    ]`;
    return JSON.parse(testCards);
  }

}
