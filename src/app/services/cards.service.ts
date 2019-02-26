import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CrudService } from 'src/app/services/crud.service';

@Injectable({
  providedIn: 'root'
})
export class CardsService extends CrudService {

  protected readAllUri: string = '/api/cards';
  protected readByIdUri: string = 'api/cards/';

  constructor(
    http: HttpClient
  ) {
    super(http); // call parent construct
   }

}
