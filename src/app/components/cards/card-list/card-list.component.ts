import { Component, OnInit, OnDestroy } from '@angular/core';
import { CardsService } from 'src/app/services/cards.service';
import { Card } from 'src/app/interfaces/card.interface';
import { FiltersService } from 'src/app/services/filters.service';
import { Filter } from 'src/app/interfaces/filter.interface';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {

  /********************************************/
  /*   # Properties                          */
  /******************************************/

  protected cardList_full: any[] = [];
  protected cardList_filtered: any[] = [];

  protected allowedFilters = [
    'campaignId'
  ];
  protected filters = {
    campaignId: {
      value: '',
      filterKey: 'campaignId'
    }
  };

  protected resReceived = false;
  private cardsService: CardsService;

  private filtersService: FiltersService;


  /********************************************/
  /*   # Constructor                         */
  /******************************************/

  constructor(
    cardsService: CardsService,
    filtersService: FiltersService
  ) {
    this.cardsService = cardsService;
    this.filtersService = filtersService;
  }

  /********************************************/
  /*   # On Init                             */
  /******************************************/

  ngOnInit() {
    this.getCards();
    // this.cardList_full = this.testing();
    // this.cardList_filtered = this.cardList_full;

    this.filtersService.onFilterChange.subscribe((res) => {
      this.applyFilterChange(res);
      console.log('Hey! Filter Changed');
      console.log(res);
    });
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
  Access the API for a full list of cards
  */

  protected getCards(): void{
    /*Subscribe to Cards Service*/
    this.cardsService.readAll().subscribe((res) => {
      /*
      Valid: check if the response has the property 'items',
      which should contain the cards. If the response is not valid,
      it is likely due to a 404.
      */
      console.log(res);
      let valid = res.hasOwnProperty('items');
      if(valid){
        this.cardList_full = res['items'];// get list of cards from response
        this.cardList_filtered = this.cardList_full;
      }
      this.resReceived = true; // let the component know the get request is complete
    }, (error) => {
      console.log(error);
      this.resReceived = true; // let the component know the get request is complete
    });

  }

  protected applyFilterChange(changedFilter){
    console.log('Apply Filter Change:')
    console.log(changedFilter);
    let valid = this.checkValidFilterChange(changedFilter);
    if(valid){
      this.filters[changedFilter.property].value = changedFilter.value;
      this.filterDisplayList();
    }else {
      console.log('Filter not applied. Ignore.');
    }
  }

  protected checkValidFilterChange(changedFilter){
    let validProp = this.allowedFilters.indexOf(changedFilter.property) > -1;
    return validProp;
  }

  protected filterDisplayList(){
    // start with full list of cards
    let filteredCards = this.cardList_full;
    /*
    For each of the allowed filters,
    filter the list by the filter's value and make this the new filtered list of cards.
    */
    for(let i=0; i<this.allowedFilters.length; i++){
      let filterType = this.allowedFilters[i];
      let filterKey = this.filters[filterType]['filterKey'];
      let filterValue = this.filters[filterType].value;
      if(filterValue.length > 0) {
        filteredCards = filteredCards.filter((card) => {
          return card[filterKey] == filterValue;
        });
      }
    }
    this.cardList_filtered = filteredCards;
  }

}
