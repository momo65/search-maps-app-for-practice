import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { AgmCoreModule } from '@agm/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import { InfiniteScrollModule} from 'ngx-infinite-scroll';//,InfiniteScroll
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { MapsAutocompleteComponent } from './maps-autocomplete/maps-autocomplete.component';
import { SearchMapsComponent } from './search-maps.component';
import { PlaceDescriptionComponent } from './place-description/place-description.component';
import { MapsComponent } from './maps/maps.component';
import {searchMapsReducer} from './store/search-maps.reducers';
import {SearchMapsEffects} from './store/search-maps.effects';
import { OldPlacesComponent } from './old-places/old-places.component';
import {SharedModule} from '../shared/shared.module';
import { environment } from '../../environments/environment';

@NgModule({
  declarations:[
    MapsAutocompleteComponent,
    SearchMapsComponent,
    MapsComponent,
    PlaceDescriptionComponent,
    OldPlacesComponent
  ],
  imports:[
    SharedModule,
    GooglePlaceModule,
    HttpClientModule,
    InfiniteScrollModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule, // for database
    AgmCoreModule.forRoot({apiKey: 'AIzaSyCwdbL24qTBYbGCEwCz0Gooca4NIID6qCw'}),
    StoreModule.forFeature('searchMaps',searchMapsReducer),
    EffectsModule.forFeature([SearchMapsEffects])
  ]//,
  //directives:[InfiniteScroll]
})
export class SearchMapsModule{}
