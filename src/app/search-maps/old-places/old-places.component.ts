import { Component,OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {take} from 'rxjs/operators';
import * as _ from 'lodash';

import * as fromSM from '../store/search-maps.reducers';
import * as fromAuth from '../../auth/store/auth.reducers';
import {Place} from '../../shared/place.model'
import * as smActions from '../store/search-maps.actions';

@Component({
  selector: 'app-old-places',
  templateUrl: './old-places.component.html',
  styleUrls: ['./old-places.component.css']
})
export class OldPlacesComponent implements OnInit{
  //oldPlaces:Place[];
  authState$:Observable<fromAuth.State>;
  smState$:Observable<fromSM.State>;

  constructor(private store:Store<fromSM.FeatureState>) {}

  nextPlaces(event) {
    console.log("next ",event);
    this.store.dispatch(new smActions.UpdateStartEnd('+'));
    this.store.select('searchMaps').pipe(take(1)).subscribe(
      (smState)=>{
        this.store.dispatch(new smActions.DoFetch({startAt:smState.startAt,endBefore:smState.endBefore}));
      }
    );
  }

  prevPlaces(event) {
    console.log("previous ",event);
    this.store.dispatch(new smActions.UpdateStartEnd('-'));
    this.store.select('searchMaps').pipe(take(1)).subscribe(
     (smState)=>{
       this.store.dispatch(new smActions.DoFetch({startAt:smState.startAt,endBefore:smState.endBefore}));
     }
   );
 }

  ngOnInit() {
    this.authState$=this.store.select('auth');
    this.smState$=this.store.select('searchMaps');
    /*this.subscription=this.store.select('searchMaps').subscribe(
      (smState)=>{
        if(smState.oldPlaces){
          let propPlaces=Object.keys(smState.oldPlaces);
          this.oldPlaces=[];
          for(let prop of propPlaces){
            this.oldPlaces.push(smState.oldPlaces[prop]);
          }
          for(let place of this.oldPlaces){
            if(!place['name']){place.name=null;}
            if(!place['lat'] || !place['lng']){place.lat=0;place.lng=0;}
            if(!place['phoneNumber']){place.phoneNumber=null;}
            if(!place['icon']){place.icon=null;}
            if(!place['types']){place.types=[];}
            if(!place['vicinity']){place.vicinity=null;}
          }
        }else{
          this.oldPlaces=[];
        }
      }
    );*/
  }

  placeChange(event){
    this.store.select('searchMaps').pipe(take(1)).subscribe(
      (smState)=>{
        if(+event.srcElement.value!=-2){
          let place;
          if(+event.srcElement.value>-1){
            place=smState.oldPlaces[+event.srcElement.value];
          }else{
            place=smState.currentPlace;
          }
          console.log(place);
          if(!place['name']){place.name=null;}
          if(!place['lat'] || !place['lng']){place.lat=0;place.lng=0;}
          if(!place['phoneNumber']){place.phoneNumber=null;}
          if(!place['icon']){place.icon=null;}
          if(!place['types']){place.types=[];}
          if(!place['vicinity']){place.vicinity=null;}
          const placeX2=new Place(place.name,place.lat,place.lng,place.phoneNumber,place.icon,place.types,place.vicinity);
          this.store.dispatch(new smActions.SetPlace(placeX2));
        }
      }
    );
  }
}
