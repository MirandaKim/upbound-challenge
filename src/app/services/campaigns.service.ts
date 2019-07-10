import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CrudService } from 'src/app/services/crud.service';
import { Campaign } from 'src/app/interfaces/campaign.interface';

/**********************************************************/
/*                                                       */
/*   Campaigns Service (campaigns.service.ts)           */
/*                                                     */
/******************************************************/
/*

  Access Campaign data from provided API.
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
export class CampaignsService extends CrudService  {

  /********************************************/
  /*   # Properties                          */
  /******************************************/

  protected readAllUri: string = '/api/campaigns';
  protected readByIdUri: string = '/api/campaigns/';
  protected updateAllUri: string = '/api/campaigns/update'; // currently not supported

  /********************************************/
  /*   # Constructor                         */
  /******************************************/

  constructor(
    httpClient: HttpClient
  ) {
    super(httpClient); // call parent construct
   }

}
