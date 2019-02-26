import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CrudService } from 'src/app/services/crud.service';

@Injectable({
  providedIn: 'root'
})
export class CampaignsService extends CrudService  {

  protected readAllUri: string = '/api/campaigns';
  protected readByIdUri: string = 'api/campaigns/';

  constructor(
    http: HttpClient
  ) {
    super(http); // call parent construct
   }

}
