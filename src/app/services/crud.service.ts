import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

/**********************************************************/
/*                                                       */
/*   CRUD Service                                       */
/*                                                     */
/******************************************************/
/*

  C.R.U.D. access to a provided API.

  This is an abstract class. See list of abstract properties to see
  which properties the child class must have to function accoringly.

  DI: Inject any dependencise (e.g. HttpClient) through the child component's contructor,
      then pass it to the instance of this class via super()
      Ex: super(httpClient: HttpClient)

  *** WARNING: this survice currently only includes the Read functionality.
               C, U, and D public functions are created, but currently have no logic.

*****************
*   Contents:   *
*****************

  # Properties
  # Constructor
  # Public
    > Read All
    > Read By ID
    > Create
    > Update
    > Delete

******************/

export abstract class CrudService {

  /********************************************/
  /*   # Properties                          */
  /******************************************/

  protected httpClient: HttpClient;

  protected abstract readAllUri: string; // ex: '/api/items'
  protected abstract readByIdUri: string; // ex: '/api/items/'
  protected abstract updateAllUri: string = ''; // ex: '/api/items/update'

  protected httpOptions = {};

  /*The following properties are on hold till C U and D functionality is coded*/
  // protected abstract createUri: string; // on hold for createItem method
  // protected abstract updateUri: string; // on hold for updateItem method
  // protected abstract deleteUri: string; // on hold for deleteItem method

  /********************************************/
  /*   # Constructor                         */
  /******************************************/

  constructor(httpClient) {
    this.httpClient = httpClient;

    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
  }

  /********************************************/
  /*   # Public                              */
  /******************************************/

  /****************
  *  > Read All   *
  ****************/

  /*
  Read All:
  Get full list of JSON data from the API
  */
  public readAll(){
    return this.httpClient.get(this.readAllUri);
  }

  /******************
  *  > Read By ID   *
  ******************/

  /*
  Read By ID:
  Get JSON data from the API filtered by the ID value provided in the parameter.
  *** Note: this may return more than one item if the ID matches more than one item.
  */
  public readById(id){
    return this.httpClient.get(this.readByIdUri + id);
  }

  /**************
  *  > Create   *
  **************/

  /*
  Create Item:

  *** Note: this is not currently functional
  */
  public createItem(values) {
    //@TODO - write funtionality for sending json data
    console.log(`WARNING: Logic for creating json data is not a current feature.`);
  }

  /**************
  *  > Update   *
  **************/

  /*
  Update Item:

  *** Note: this is not currently functional
  */
  public updateItem(id, values){
    console.log(values);
    //@TODO - write funcitonality for updating json data
    console.log(`WARNING: logic for updating json data is not a current feature.`)
  }

  /*
  Update All:
  This will replace the entire content with the provided list.
  */
  public updateAll(updatedList: any[]): Observable<Object> {
    return this.httpClient.post(this.updateAllUri, JSON.stringify(updatedList), this.httpOptions);
  }

  /**************
  *  > Delete   *
  ***************/

  /*
  Delete Item:

  *** Note: this is not currently functional
  */
  public deleteItem(id){
    //@TODO - write functionality for delete json data
    console.log(`WARNING: Logic for deleting json data is not a current feature.`);
  }


}
