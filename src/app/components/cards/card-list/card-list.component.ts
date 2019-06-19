import { Component, OnInit, OnDestroy } from '@angular/core';
// import { CardsService } from 'src/app/services/cards.service';
import { CardManagerService } from 'src/app/services/card-manager.service';
import { Card } from 'src/app/interfaces/card.interface';
import { FiltersService } from 'src/app/services/filters.service';
import { Filter } from 'src/app/interfaces/filter.interface';
import { FilterListService } from 'src/app/services/filter-list.service';

/**********************************************************/
/*                                                       */
/*   Card List                                          */
/*                                                     */
/******************************************************/
/*

Display a list of cards from the cards api.
This list can be filtered at the component level.

*****************
*   Contents:   *
*****************

  # Properties
    > Card List
    > Filter Configs
    > Services
    > Subscriptions
    > States
  # Constructor
  # On Init
  # Protected
    > Configs
    > Watch Filters
    > Watch Cards
    > Track By
  # Private
    > Apply Filter Change
  # On Destroy

******************/


@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {

  protected modCt: number = 0;

  /********************************************/
  /*   # Properties                          */
  /******************************************/

  /*****************
  *  > Card List   *
  *****************/

  protected cardList_full: any[] = []; // complete list of cards
  protected cardList_filtered: any[] = []; // filtered list of cards (filtered for display)

  /**********************
  *  > Filter Configs   *
  **********************/

  protected allowedFilters = [ // list of card properties, which may be used to fitler the cards
    'campaignId',
    'cardTitle',
    'id',
    'currentWorkflow'
  ];

  /****************
  *  > Services   *
  ****************/

  protected cardManagerService: CardManagerService; // service for reading/updating card data
  private filtersService: FiltersService; // Service used for tracking filters
  private filterListService: FilterListService; // Service for filtering list of cards

  /*********************
  *  > Subscriptions   *
  *********************/

  protected cardsWatch; // watching for card list from CardManagerService
  protected filterWatch; // watching for fitler updates from FiltersService
  protected cardUpdateWatch; // watch when the card manager is updating cards

  /**************
  *  > States   *
  **************/

  protected initialApiReponseReceived = false; // Received response from API (note: 404 still counts as a response).
  protected awaitingApiResponseCt: number = 0; // wating to receive

  /********************************************/
  /*   # Constructor                         */
  /******************************************/

  constructor(
    // cardsService: CardsService,
    cardManagerService: CardManagerService,
    filtersService: FiltersService,
    filterListService: FilterListService
  ) {
    // this.cardsService = cardsService;
    this.cardManagerService = cardManagerService;
    this.filtersService = filtersService;
    this.filterListService = filterListService;
  }

  /********************************************/
  /*   # On Init                             */
  /******************************************/

  ngOnInit() {
    /*
    Configure Filter Info
    */
    this.configureListFilter(); // set configs for filtering the cards with the FilterListService

    /*
    Watch for filter updates
    */
    this.watchFilters();

    /*
    Watch for card list updates
    */
    this.watchCardList();

    this.watchUpdating();
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

  /*********************
  *  > Watch Filters   *
  *********************/
  /*
  Watch Filters:
  Watch for filter updates and apply the valid filters to the filtered card list.
  */
  protected watchFilters (){
    this.filterWatch = this.filtersService.onFilterChange.subscribe((res) => {
      this.applyFilterChange(res);
    });
  }

  /*******************
  *  > Watch Cards   *
  *******************/
  /*
  Get Cards:
  Access the API for a full list of cards
  */
  protected watchCardList(): void{
    /*Watch to receive list of cards from the Card Manager Service*/
    this.cardsWatch = this.cardManagerService.cardListReceived.subscribe((res) => {
      this.cardList_full = res;
      this.applyFilters();
      this.initialApiReponseReceived = true;
    });

  }

  protected watchUpdating(): void {
    this.cardUpdateWatch = this.cardManagerService.cardsUpdating.subscribe((res: number) => {
      this.awaitingApiResponseCt = res;
    });
  }

  /****************
  *  > Track By   *
  ****************/

  /*
  Track By State
  Use as to track each card while looping through the list of cards.
  This is to keep all cards from re-renderingn when one is updated.
  */
  protected trackByState(i, item){
    let state = item.id + item.currentWorkflow;
    return state;
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
      this.applyFilters();
    }
  }

  /*
  Apply Filters
  Apply any and all valid filters to the filtered card list.
  */
  private applyFilters(){
    this.cardList_filtered = this.filterListService.filterList(this.cardList_full);
  }

  /********************************************/
  /*   # On Destroy                          */
  /******************************************/

  ngOnDestroy(){
    this.cardsWatch.unsubscribe();
    this.filterWatch.unsubscribe();
    this.cardUpdateWatch.unsubscribe();
  }


}
