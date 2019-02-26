// import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// @Injectable({
//   providedIn: 'root'
// })
export abstract class CrudService {

  protected http: HttpClient;

  protected abstract readAllUri: string;
  protected abstract readByIdUri: string;
  // protected abstract createUri: string; // on hold for createItem method
  // protected abstract updateUri: string; // on hold for updateItem method
  // protected abstract deleteUri: string; // on hold for deleteItem method

  constructor(http) {
    this.http = http;
  }

  public getAllItems(){
    console.log(`Reading from ${this.readAllUri}`);
    return this.http.get(this.readAllUri);
  }

  public getItemById(id){
    return this.http.get(this.readByIdUri + id);
  }

  public createItem(values) {
    //@TODO - write funtionality for sending json data
    console.log(`WARNING: Logic for creating json data is not a current feature.`);
  }

  public updateItem(id, values){
    //@TODO - write funcitonality for updating json data
    console.log(`WARNING: logic for updating json data is not a current feature.`)
  }

  public deleteItem(id){
    //@TODO - write functionality for delete json data
    console.log(`WARNING: Logic for deleting json data is not a current feature.`);
  }


}
