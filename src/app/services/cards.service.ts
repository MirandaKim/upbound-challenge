import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CrudService } from 'src/app/services/crud.service';

/**********************************************************/
/*                                                       */
/*   Cards Service (cards.service.ts)                   */
/*                                                     */
/******************************************************/
/*

  Access Cards data from provided API.
  To see more availible methods, see the parent class crud.service.ts

*****************
*   Contents:   *
*****************

  # Properties
  # Constructor

******************/

@Injectable({
  providedIn: 'root'
})
export class CardsService extends CrudService {

  /********************************************/
  /*   # Properties                          */
  /******************************************/

  protected readAllUri: string = '/api/cards';
  protected readByIdUri: string = '/api/cards/';
  protected updateAllUri: string = '/api/cards/update';

  /********************************************/
  /*   # Constructor                         */
  /******************************************/

  constructor(
    httpClinet: HttpClient
  ) {
    super(httpClinet); // call parent construct
   }

}
