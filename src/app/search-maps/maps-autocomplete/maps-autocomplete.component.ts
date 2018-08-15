import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

import {Place} from '../../shared/place.model';
import * as smActions from '../store/search-maps.actions';
import * as fromSM from '../store/search-maps.reducers';
import * as fromAuth from '../../auth/store/auth.reducers';

@Component({
  selector: 'app-maps-autocomplete',
  templateUrl: './maps-autocomplete.component.html',
  styleUrls: ['./maps-autocomplete.component.css']
})
export class MapsAutocompleteComponent implements OnInit {
  place:Place;
  authState$:Observable<fromAuth.State>;
  //options=null;

  constructor(private store:Store<fromSM.FeatureState>) { }

  ngOnInit() {
    this.authState$=this.store.select('auth');
  }

  handleAddressChange(address){//formatted_address
    //https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=1500&type=restaurant&keyword=cruise&key=
    console.log(address);
    let name,lat,lng,phoneNumber,icon,types,vicinity;
    if(address['name']){name=address.name;}else{name=null}
    if(address.geometry.location['lat'] && address.geometry.location['lng']){
      lat=address.geometry.location.lat();lng=address.geometry.location.lng();
    }else{lat=null;lng=null;}
    if(address['formatted_phone_number']){phoneNumber=address.formatted_phone_number;}else{
      phoneNumber=null;}
    if(address['icon']){icon=address.icon;}else{icon=null;}
    if(address['types']){types=address.types;}else{types=[];}
    if(address['vicinity']){vicinity=address.vicinity;}else{vicinity=null;}
    this.place=new Place(name,lat,lng,phoneNumber,icon,types,vicinity);
    this.store.dispatch(new smActions.SetPlace(this.place));
    this.store.dispatch(new smActions.DoStore(this.place));// it adds it automatically to the oldPlaces state ;
  }
}
