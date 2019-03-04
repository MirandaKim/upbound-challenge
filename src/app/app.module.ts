import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CrudService } from './services/crud.service';
import { CardsService } from './services/cards.service';
import { CampaignsService } from './services/campaigns.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BodyComponent } from './components/body/body.component';
import { FooterComponent } from './components/footer/footer.component';
import { CardListComponent } from './components/cards/card-list/card-list.component';
import { CardComponent } from './components/cards/card/card.component';
import { CardMenuComponent } from './components/cards/card-menu/card-menu.component';
import { CardFooterComponent } from './components/cards/card-footer/card-footer.component';
import { IconComponent } from './components/icon/icon.component';
import { CardStatusComponent } from './components/cards/card-status/card-status.component';
import { CreateCardComponent } from './components/cards/create-card/create-card.component';
import { CampaignMenuComponent } from './components/campaign-menu/campaign-menu.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyComponent,
    FooterComponent,
    CardListComponent,
    CardComponent,
    CardMenuComponent,
    IconComponent,
    CardFooterComponent,
    CardStatusComponent,
    CreateCardComponent,
    CampaignMenuComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
