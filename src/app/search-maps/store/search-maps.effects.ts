import {Injectable} from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Actions,Effect} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {map,switchMap,catchError,mergeMap,withLatestFrom} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import { AngularFireDatabase,AngularFireList} from 'angularfire2/database';
import * as _ from "lodash";
import * as firebase from 'firebase';

import * as smActions from './search-maps.actions';
import {Place} from '../../shared/place.model';
import * as fromSM from './search-maps.reducers';

@Injectable()
export class SearchMapsEffects{
  placesRef:AngularFireList<any>=null;

  constructor(private actions$:Actions,private httpClient:HttpClient,private store:Store<fromSM.FeatureState>,
    public db: AngularFireDatabase){
      this.placesRef=db.list('/places');
    }

  @Effect()
  doStore$=this.actions$.ofType(smActions.DO_STORE).pipe(map(
    (smAction:smActions.DoStore)=>{
      return smAction.payload;
    }
  ),map(
    (place)=>{
      this.placesRef.push(place);
      return place;
    }
  ),map(
    (place)=>{
      return new smActions.AddToOldPlaces(place);
    }
  ),catchError(
    (error,X)=>{
      console.log(error);
      return X;
    }
  ));

  getPlaces(actionData:{startAt:number,endBefore:number}):Observable<any[]>{
    return this.placesRef.snapshotChanges().pipe(map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    }),map(
      places => {
        let placesV;
        placesV = _.slice(places, actionData.startAt, actionData.endBefore);
        return placesV;
    }));
  }

  @Effect()
  doFetch$=this.actions$.ofType(smActions.DO_FETCH).pipe(map(//extract payload & use it as key
    (smAction:smActions.DoFetch)=>{
      return smAction.payload;
    }
  ),switchMap(
    (actionData:{startAt:number,endBefore:number})=>{
      return this.getPlaces(actionData);
    }
  ),map(
    (afPlaces:any[]) => {
      console.log(afPlaces);
      return new smActions.SetPlaces(afPlaces);
    }
  ),catchError(
    (error,X)=>{
      console.log(error);
      console.log(X);
      return X;
    }
  ));

  @Effect()
  doFetchSelectedPlace$=this.actions$.ofType(smActions.DO_FETCH_SELECTED_PLACE).pipe(map(
    (smAction:smActions.DoFetchSelectedPlace)=>{
      return smAction.payload;
    }
  ),switchMap(
    (actionData:{lat:number,lng:number})=>{//new AIzaSyB9JZkvyU7eCkoAnCukbkKkkfZpBuXEAsA \old AIzaSyCwdbL24qTBYbGCEwCz0Gooca4NIID6qCw
      return this.httpClient.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json?"+
      "location="+actionData.lat+","+actionData.lng+"&radius=24&key=AIzaSyB9JZkvyU7eCkoAnCukbkKkkfZpBuXEAsA");
    //{observe:'response',responseType:'json'}
    }
  ),map(
    (placesData)=>{
      console.log(placesData);
      let propPlacesData=Object.keys(placesData);
      let placesDataV=[];
      for(let prop of propPlacesData){
        placesDataV.push(placesData[prop]);
      }
      if(placesDataV[2]!="ZERO_RESULTS"){
        console.log(placesDataV);
        if(placesDataV[1].length>0){
          const gpPlace=placesDataV[1][this.chooseBestPlace(placesDataV[1])];
          let name,lat,lng,phoneNumber,icon,types,vicinity;
          if(!gpPlace['name']){name=null;}else{name=gpPlace.name;}
          if(!gpPlace.geometry.location['lat'] || !gpPlace.geometry.location['lng']){lat=0;lng=0;}else{
            lat=gpPlace.geometry.location.lat;lng=gpPlace.geometry.location.lng;}
          if(!gpPlace['formatted_phone_number']){phoneNumber=null;}else{phoneNumber=gpPlace.formatted_phone_number;}
          if(!gpPlace['icon']){icon=null;}else{icon=gpPlace.icon;}
          if(!gpPlace['types']){types=[];}else{types=gpPlace.types;}
          if(!gpPlace['vicinity']){vicinity=null;}else{vicinity=gpPlace.vicinity;}
          const selectedPlace=new Place(name,lat,lng,phoneNumber,icon,types,vicinity);
          console.log(selectedPlace);
          return new smActions.StoreSelectedPlace(selectedPlace);
        }else{
          return new smActions.Void(placesDataV[2]);
        }
      }else{
        console.log(2);
        return new smActions.Void(placesDataV[2]);
      }
    }
  ),catchError(
    (error,X)=>{
      console.log(error);
      console.log(X);
      return X;
    }
  ));

  @Effect()
  doStoreSelectedPlace$=this.actions$.ofType(smActions.DO_STORE_SELECTED_PLACE).pipe(withLatestFrom(
    this.store.select('searchMaps')
  ),map(
    ([smAction,smState])=>{//new AIzaSyB9JZkvyU7eCkoAnCukbkKkkfZpBuXEAsA \old AIzaSyCwdbL24qTBYbGCEwCz0Gooca4NIID6qCw
      console.log(smState.selectedPlace);
      this.placesRef.push(smState.selectedPlace);
      return smState.selectedPlace;
    }
  ),mergeMap(
    (selectedPlace)=>{
      console.log(selectedPlace);
      return[
        new smActions.AddToOldPlaces(selectedPlace),
        new smActions.SetSPA(true)
      ];
    }
  ),catchError(
    (error,X)=>{
      console.log(error);
      console.log(X);
      return X;
    }
  ));

  chooseBestPlace(results){//.geometry.viewport.northeast/southwest.lat
    let viewports=[];
    for(let res of results){
      viewports.push(res.geometry.viewport);
    }
    let differencesLatLng=[];
    for(let vp of viewports){
      differencesLatLng.push({diffLat:(vp.northeast.lat-vp.southwest.lat),
        diffLng:(vp.northeast.lng-vp.southwest.lng)});
    }
    let surfaces=[];
    for(let diff of differencesLatLng){
      surfaces.push(diff.diffLat*diff.diffLng);
    }//now find min surface which index?;
    const index=this.findMinSurface(surfaces);
    return index;
  }

  findMinSurface(surfs){
    let minSurface=surfs[0];
    let indexS=0;
    let counter=0;
    for(let surf of surfs){// we can use surfs.splice(0,1) to avoid checking [0] but we should then pass a copy of surfaces
      if(minSurface>surf){
        minSurface=surf;
        indexS=counter;
      }
      counter++;
    }
    return indexS;
  }
}
