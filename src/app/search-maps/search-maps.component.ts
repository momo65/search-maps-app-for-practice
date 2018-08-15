import { Component, OnInit,OnDestroy} from '@angular/core';
import {Store} from '@ngrx/store';
import { } from 'googlemaps';
import {take} from 'rxjs/operators';
import { AngularFireDatabase } from 'angularfire2/database';
import * as _ from 'lodash';

import * as fromSM from './store/search-maps.reducers';
import * as smActions from './store/search-maps.actions';
import {Place} from '../shared/place.model';

@Component({
  selector: 'app-search-maps',
  templateUrl: './search-maps.component.html',
  styleUrls: ['./search-maps.component.css']
})
export class SearchMapsComponent implements OnInit,OnDestroy {
  constructor(private store:Store<fromSM.FeatureState>,public db: AngularFireDatabase) {}

  ngOnInit() {
    let lat,lng,name,place;
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        lat = position.coords.latitude;
        lng = position.coords.longitude;
        if(!lat||!lng){
          name="(0,0)";
          lat=0;
          lng=0;
        }else{
          name="Current Position";
        }
        place=new Place(name,lat,lng,"","",[],"");
        this.store.dispatch(new smActions.SetPlace(place));
        this.store.dispatch(new smActions.SetCurrentPlace(place));
      });
    }

    this.store.select('auth').pipe(take(1)).subscribe(
      (authState)=>{
        if(authState.authenticated){
          this.store.select('searchMaps').pipe(take(1)).subscribe(
            (smState)=>{
              this.store.dispatch(new smActions.DoFetch({startAt:smState.startAt,endBefore:smState.endBefore}));
            }
          );
        }
      }
    );
  }

  ngOnDestroy(){
    this.store.dispatch(new smActions.ResetStartEnd());
  }
}
