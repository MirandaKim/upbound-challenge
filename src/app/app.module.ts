import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LazyLoadImageModule, intersectionObserverPreset } from 'ng-lazyload-image';

import { CrudService } from './services/crud.service';
import { CardsService } from './services/cards.service';
import { CardManagerService } from './services/card-manager.service';
import { CampaignsService } from './services/campaigns.service';
import { FiltersService } from './services/filters.service';
import { FilterListService } from './services/filter-list.service';

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
import { CardFooterRejectedComponent } from './components/cards/card-footer-rejected/card-footer-rejected.component';
import { CardFooterActiveComponent } from './components/cards/card-footer-active/card-footer-active.component';
import { SearchFilterComponent } from './components/search-filter/search-filter.component';
import { StatusMenuComponent } from './components/status-menu/status-menu.component';
import { DateSelectorComponent } from './components/date-selector/date-selector.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { CardWorkflowComponent } from './components/cards/card-workflow/card-workflow.component';
import { OrdinalPipe } from './pipes/ordinal.pipe';
import { SkipToContentComponent } from './components/skip-to-content/skip-to-content.component';
import { TruncateWithSuffixPipe } from './pipes/truncate-with-suffix.pipe';


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
    CardFooterRejectedComponent,
    CardFooterActiveComponent,
    SearchFilterComponent,
    StatusMenuComponent,
    DateSelectorComponent,
    SpinnerComponent,
    CardWorkflowComponent,
    OrdinalPipe,
    SkipToContentComponent,
    TruncateWithSuffixPipe
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    AppRoutingModule,
    LazyLoadImageModule.forRoot({
      preset: intersectionObserverPreset // removed to prevent svg icons from disappearing in Chrome production build.
    })
  ],
  providers: [
    FilterListService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
