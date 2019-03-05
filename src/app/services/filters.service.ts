import { Injectable, Output, EventEmitter } from '@angular/core';
import { Filter } from 'src/app/interfaces/filter.interface';

/*
  Keep a list of value filteres (including where the filter came from).
  These filters can be accessed by components and other services with filterable content.
*/

@Injectable({
  providedIn: 'root'
})
export class FiltersService {

  /********************************************/
  /*   # Properties                          */
  /******************************************/

  /****************
  *  > Filtered   *
  ****************/

  @Output()
  // protected filterList = new EventEmitter<any>();
  public onFilterChange = new EventEmitter<Filter>();

  protected masterList: Filter[] = [];

  protected filterCt: number = 0;

  /********************************************/
  /*   # Constructor                         */
  /******************************************/

  constructor() { }

  /********************************************/
  /*   # Public                              */
  /******************************************/

  public getFilters(property, setLocation = ''){
    let matches = this.findFilters('property', property, setLocation);
    return matches;
  }

  public getFilterById(filterId): Filter|null{
    let matches: Filter[] = this.findFilters('id', filterId);
    let match;
    if(match.length > 0) {
      match = matches[0];
    }
    return match;
  }

  public addFilter(property: string, value: string|number|boolean, valueType: string, setLocation: string){
    this.filterCt++;
    let id = this.filterCt.toString();
    let filter: Filter = {
      id,
      property,
      value,
      valueType,
      setLocation
    }
    this.masterList.push(filter);
    return id;
  }

  public changeFilter(filterId: string, value: string|number|boolean) {
    console.log(`Changing filter ${filterId} to ${value}`);
    let filterIndex = this.getFilterIndex(filterId);
    try{
      this.masterList[filterIndex].value = value;
      this.emitChange(this.masterList[filterIndex]);
      return true;
    }catch(e){
      console.log(e);
      return false;
    }
  }

  public removeFilterById(filterId){

    let wasDeleted = true;
    return wasDeleted;
  }

  /********************************************/
  /*   # Protected                           */
  /******************************************/

  protected getFilterIndex(filterId){
    let index = this.masterList.map((filter) => {
      return filter.id;
    }).indexOf(filterId);
    return index;
  }

  protected findFilters(property: string, value: string, setLocation: string = ''){
      let matches = this.masterList.filter((filter) => {
        let locationCheck = setLocation.length > 0 ? setLocation == filter.setLocation : true;
        let valueCheck = value == filter[property];
        return filter[property] == locationCheck && valueCheck;
      });
      return matches;
  }

  private emitChange(filterObj: Filter){
    this.onFilterChange.emit(filterObj);
  }
}
