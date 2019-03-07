import { Component, OnInit, OnDestroy } from '@angular/core';
import { CardsService } from 'src/app/services/cards.service';
import { Card } from 'src/app/interfaces/card.interface';
import { FiltersService } from 'src/app/services/filters.service';
import { Filter } from 'src/app/interfaces/filter.interface';
import { FilterListService } from 'src/app/services/filter-list.service';

/**********************************************************/
/*                                                       */
/*   Filter List Service                                */
/*                                                     */
/******************************************************/
/*

Display a list of cards from the cards api.
This list can be filtered at the component level.

*****************
*   Contents:   *
*****************

  # Properties
  # Constructor
  # On Init
  # Protected
    > Configs
    > Get Cards
  # Private
    > Apply Filter Change
  # On Destroy
  # For Testing

******************/


@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {

  /********************************************/
  /*   # Properties                          */
  /******************************************/

  protected cardList_full: any[] = []; // complete list of cards
  protected cardList_filtered: any[] = []; // filtered list of cards (filtered for display)

  protected allowedFilters = [ // list of card properties, which may be used to fitler the cards
    'campaignId',
    'cardTitle',
    'id',
    'currentWorkflow'
  ];
  protected filterWatch; // watching for fitler updates from FiltersService

  protected apiResponseReceived = false; // Received response from API (note: 404 still counts as a response).

  private cardsService: CardsService; // Service for accessing the cards api
  private filtersService: FiltersService; // Service used for tracking filters
  private filterListService: FilterListService; // Service for filtering list of cards


  /********************************************/
  /*   # Constructor                         */
  /******************************************/

  constructor(
    cardsService: CardsService,
    filtersService: FiltersService,
    filterListService: FilterListService
  ) {
    this.cardsService = cardsService;
    this.filtersService = filtersService;
    this.filterListService = filterListService;
  }

  /********************************************/
  /*   # On Init                             */
  /******************************************/

  ngOnInit() {
    /*
    Get Card Data
    */
    // this.getCards(); // DON'T DELETE! this is the actual api call, apply this when not testing
    this.cardList_full = this.getTestData(); // not the actual data--use instead of api for testing
    this.cardList_filtered = this.cardList_full; // for testing only
    /*
    Configure Filter Info
    */
    this.configureListFilter(); // set configs for filtering the cards with the FilterListService
    /*
    Watch for filter updates
    */
    this.filterWatch = this.filtersService.onFilterChange.subscribe((res) => {
      this.applyFilterChange(res);
    });
  }

  /********************************************/
  /*   # Protected                           */
  /******************************************/

  /***************
  *  > Configs   *
  ***************/
  /*
  Configure List Filter:
  Provide the FilterListService with a list of properties
  that can be used to filter the list of cards.
  */
  protected configureListFilter(){
    this.filterListService.setConfig(this.allowedFilters);
  }

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
      let valid = res.hasOwnProperty('items');
      if(valid){
        this.cardList_full = res['items'];// get list of cards from response
        this.cardList_filtered = this.cardList_full;
      }
      this.apiResponseReceived = true; // let the component know the get request is complete
    }, (error) => {
      console.log(error);
      this.apiResponseReceived = true; // let the component know the get request is complete
    });

  }

  /********************************************/
  /*   # Private                             */
  /******************************************/

  /***************************
  *  > Apply Filter Change   *
  ***************************/

  /*
  Apply Filter Change:
  When a filter value has changed, send the new filter to the FilterListService.
  If the filter can be applied, then get a list of cards filtered by the new value.
  */
  private applyFilterChange(changedFilter: Filter){
    let validFilter = this.filterListService.applyFilter(changedFilter);
    if(validFilter){
      this.cardList_filtered = this.filterListService.filterList(this.cardList_full);
    }
  }

  /********************************************/
  /*   # On Destroy                          */
  /******************************************/

  ngOnDestroy(){
    this.filterWatch.unsubscribe();
  }

  /********************************************/
  /*   # For Testing                         */
  /******************************************/
  /*
  TEST FUNCTION
  Dev note: this function is only for development purposes when API cannot be accessed.
  */
  private getTestData() {
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
      },
      {
        "campaignId": "CN201701182!!",
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
        "campaignId": "CN201701!",
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
      }
    ];
    return testCards;
  }

}
