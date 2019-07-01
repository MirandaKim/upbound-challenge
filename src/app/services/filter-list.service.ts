import { Filter } from 'src/app/interfaces/filter.interface';
import { FilterConditions } from 'src/app/enums/filter-conditions.enum';

/**********************************************************/
/*                                                       */
/*   Filter List Service                                */
/*                                                     */
/******************************************************/
/*

Service to filter a list of items (objects).
- Filter configurations can be set initially
- Use the filter output from the FiltersService to apply filter values and conditions
- Filter a list of items based on the applied filter values and conditions

*** Note: the include filter is now case insensitive. See "Filter By Condition: Includes" below.

*******************
*   How to use:   *
*******************

 1. Provide a list of properties from that are allowed to be used as filters
    EX: filterListService.setConfig(['id', 'name', 'state']);

 2. Apply new/changed filters by passing in a filter object (filter.interface.ts) provided by the FiltersService output (filter.service.ts).
    If the filtered property is considered valid (in list of allowed properties), the filter value will be stored and ready to use for filtering items.
    EX: filterListService.applyFilter({id: '0', property: 'name', value: 'Hello World', valueType: 'string', condition: 'includes', setLocation: 'search-filter'}, [...])

 3a. Get a list of filtered items by passing your full list to be filtered into the filterList method.
    Those items will be filtered based on the filter critera stored in the instance of this object.
    Ex: filterListService.filterList([{name: "Hello World", id: "12345", state: "live"}, {name: "Hello Again", id: "12346", state: "paused"}])
    Ex result: [{name: "Hello Again", id: "12346", state: "paused"}]

    [OR]

 3b. Get a object of the item ids and whether or not the item should be displayed or hidden
    as determined by the filter results.
    Ex: filterListService.getDisplayList([{name: "Hello World", id: "12345", state: "live"}, {name: "Hello Again", id: "12346", state: "paused"}], 'id');
    Ex result: {'12345': true, '12346': false}
    *** CAUTION: this will only work as intended if all ids are unique to each item.

*****************
*   Contents:   *
*****************

  # Interfaces
  # Properties
  # Constructor
  # Public
    > Set Config
    > Apply Filter
    > Fitler List
  # Protected
    > Update Filter Details
    > Check Valid Filter Change
    > Filter By Condition
  # Private
    > Filter By Condition: Match
    > Filter By Condition: Is Not
    > Filter By Condition: Includes

******************/

/********************************************/
/*   # Interfaces                          */
/******************************************/

interface FilterInfo {
  itemProperty: string; // property to filter (e.g. "name")
  condition: string; // condition to filter by (e.g. "match")
  value: string; // value to filter with (e.g. "Hello World")
}

interface DisplayList {
  [key: string]: boolean
}

export class FilterListService {

  /********************************************/
  /*   # Properties                          */
  /******************************************/

  protected allowedFilters: string[] = []; // list of properties that can be used to filter a list of items
  protected filterDetails: FilterInfo[] = []; // list of info/details for each filter availible
  protected filterConditions = FilterConditions; // enum with list of availible filter conditions

  /********************************************/
  /*   # Constructor                         */
  /******************************************/

  constructor() {}

  /********************************************/
  /*   # Public                              */
  /******************************************/

  /******************
  *  > Set Config   *
  ******************/

  /*
  Set Config:
  Prepare the instance of this object for use by providing the following information (note, this object is useless without this initial step):
  - Allowed Filters: include a list of property names (found in your list of items) that can be used to filter the list of items.
  */
  public setConfig(allowedFilters: string[]){
    this.allowedFilters = allowedFilters; // set list of properties that may be used to filter the list content.
    for(let i=0; i<this.allowedFilters.length; i++){
      let filterProperty = this.allowedFilters[i];
      this.filterDetails[filterProperty] = {
          value: '',
          condition: '',
          itemProperty: filterProperty
      };
    }
  }

  /********************
  *  > Apply Filter   *
  ********************/
  /*
  Apply Filter:
  Change the value and/or condition of one of the allowed filters by providing
  a changedFilter:Filter from the FiltersService (filters.services.ts).
  This returns a boolean value: true if the filter is valid and the changes was made. Else false.

  *** Note: this does not filter any lists--only makes changes to the current filter settings.
            To filter a list, see this.filterList(...)
  */
  public applyFilter(changedFilter: Filter): boolean{
    let filterApplied = this.updateFilterDetails(changedFilter);
    return filterApplied;
  }

  /*******************
  *  > Filter List   *
  *******************/

  /*
  Filter List:
  Filter a list of items based on the filter info stored in this.filterDetails.
  A filter will not be applied if:
    - the value is an empty string
    - the filter property is not in the list of allowed filters (see this.setConfig(...))
    - there is no logic to handle the filter condition (see this.filterByCondition(...))
  */
  public filterList(fullItemList: Object[]){
    let filteredItems = fullItemList; // start with full list of items
    /*
    Loop through each of the allowed filters to filter down the list.
    */
    for(let i=0; i<this.allowedFilters.length; i++){
      let filterProperty = this.allowedFilters[i];
      /*
      If the filter value is not an empty string,
      filter the list.
      */
      if(this.filterDetails[filterProperty].value.length > 0) {
        filteredItems = this.filterByCondition(filteredItems, filterProperty);
      }
    }
    return filteredItems;
  }

  /*
  Get Display List:
  Get a object of the item ids and whether or not the item should be displayed or hidden
  as determined by the filter results.

  *************  This only works properly if the item id are unique values.
  *  Caution  *  This uses the ids to create object properties with boolean values,
  *************  and if items share ids they will also share results despite their actual values.

  */
  public getDisplayList(fullItemList: Object[], idProperty: string = 'id'): DisplayList{
    /*
    Get the filtered list of items
    */
    let filteredItems = this.filterList(fullItemList);
    let filtersApplied = filteredItems.length !== fullItemList.length;
    /*
    Loop through the full list of items to create the display list.
    Default the display values to false (hidden) if the filters had any effect on the full list,
    else set all displays to true (because nothing has been filtered out).
    */
    let displayList: DisplayList = {};
    for(let i=0; i<fullItemList.length; i++){
      let id = fullItemList[i][idProperty];
      /* set all displays to true if no filters were applied,
      else default to false (hidden) */
      displayList[id] = !filtersApplied;
    }
    /*
    If filters were applied,
    loop through each of the filtered items and set their display to true
    in the display list.
    */
    if(filtersApplied){
      for(let i=0; i<filteredItems.length; i++){
        let id = filteredItems[i][idProperty];
        displayList[id] = true;
      }
    }
    return displayList;
  }

  /********************************************/
  /*   # Protected                           */
  /******************************************/

  /*****************************
  *  > Update Filter Details   *
  *****************************/
  /*
  Update Filter Details
  Apply the new value and/or condition for the filter property to the filter details.
  Returns true if change was applied, else false.
  */
  protected updateFilterDetails(changedFilter: Filter): boolean{
    let result = false; // assume false until validity check.
    /*Run through any validity checks to see if this is a filter that should be applied to this list.*/
    let valid = this.checkValidFilterChange(changedFilter);
    if(valid){
      // set filter to new value
      this.filterDetails[changedFilter.property].value = changedFilter.value;
      // set filter to new condition
      this.filterDetails[changedFilter.property].condition = changedFilter.condition;
      // success!
      result = true;
    }
    return result;
  }

  /*********************************
  *  > Check Valid Filter Change   *
  *********************************/

  /*
  Check Valid Filter Change:
  Run through any validity checks to see if this is a filter that is allowed to be applied.
  Returns true if it's a valid filer, else false.
  */
  protected checkValidFilterChange(changedFilter): boolean{
    // check if the filter property is included in the list of allowed filters.
    let validProp = this.allowedFilters.indexOf(changedFilter.property) > -1;
    return validProp;
  }

  /***************************
  *  > Filter By Condition   *
  ***************************/

  /*
  Filter By Condition
  Filter the list based on the filter value and filter condition for the specified filter property.
  *** Note: Filter condition is set under the filter property in this.fitlerDetails.
  Returns list of filtered items.
  */
  protected filterByCondition(filteredItems, filterProperty): Object[]{
    let filterCondition = this.filterDetails[filterProperty]['condition'];
    switch(filterCondition){
      case this.filterConditions[0]: // match
        return this.filterByCondition_match(filteredItems, filterProperty);
      break;
      case this.filterConditions[1]: // is-not
        return this.filterByCondition_isNot(filteredItems, filterProperty);
      break;
      case this.filterConditions[2]: // includes
        return this.filterByCondition_includes(filteredItems, filterProperty);
      break;
      default: // if no valid condition is found, return the passed list without changes.
        return filteredItems;
    }
  }

  /********************************************/
  /*   # Private                             */
  /******************************************/

  /**********************************
  *  > Filter By Condition: Match   *
  **********************************/

  /*
  Filter By Condition: Match
  Filter out any items from the list that do not match the filter value of the indicated filter property.
  *** Note: Filter value is set under the filter property in this.fitlerDetails.
  Returns the filtered list.
  */
  private filterByCondition_match(filteredItems, filterProperty): Object[]{
    let itemProperty = this.filterDetails[filterProperty]['itemProperty'];
    return filteredItems.filter((item) => {
      return item[itemProperty] == this.filterDetails[filterProperty].value;
    });
  }

  /***********************************
  *  > Filter By Condition: Is Not   *
  ***********************************/

  /*
  Filter By Condition: Is Not
  Filter out any items from the list that do match the filter value of the indicated filter property.
  *** Note: Filter value is set under the filter property in this.fitlerDetails.
  Returns the filtered list.
  */
  private filterByCondition_isNot(filteredItems, filterProperty): Object[]{
    let itemProperty = this.filterDetails[filterProperty]['itemProperty'];
    return filteredItems.filter((item, i) => {
      return item[itemProperty] != this.filterDetails[filterProperty].value;
    });
  }

  /*************************************
  *  > Filter By Condition: Includes   *
  *************************************/

  /*
  Filter By Condition: Includes
  Filter out any items from the list that do not include the fitler value of the indicated filter property.
  *** Note: Filter value is set under the filter property in this.fitlerDetails.
  Returns the filtered list.
  */
  private filterByCondition_includes(filteredItems, filterProperty): Object[]{
    let itemProperty = this.filterDetails[filterProperty]['itemProperty'];
    let filterVal = this.filterDetails[filterProperty].value.toLowerCase();
    return filteredItems.filter((item) => {
      try{
        let checkVal = item[itemProperty].toLowerCase();
        return checkVal.includes(filterVal);
      }catch(error){
        console.log(error)
        return false;
      }
    })
  }

}
