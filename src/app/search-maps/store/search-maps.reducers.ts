import * as smActions from './search-maps.actions';
import {Place} from '../../shared/place.model';
import * as fromApp from '../../store/app.reducers';

export interface FeatureState extends fromApp.AppState{
  searchMaps:State
}

export interface State{
  place:Place,
  currentPlace:Place,
  oldPlaces:any[],
  selectedPlace:Place,
  selectedPlaceAdded:boolean,
  mapPosition:{lat:number,lng:number},
  startAt:number,
  endBefore:number
}

const initialState:State={
  place:{
    name:"(0,0)",
    lat:0,
    lng:0,
    phoneNumber:null,
    icon:null,
    types:null,
    vicinity:null
  },
  currentPlace:{name:null,lat:null,lng:null,phoneNumber:null,icon:null,types:[],vicinity:null},
  oldPlaces:[],
  selectedPlace:null,
  selectedPlaceAdded:false,
  mapPosition:{lat:null,lng:null},
  startAt:0,
  endBefore:30
};

export function searchMapsReducer(state=initialState,action:smActions.SMActions){
  switch(action.type){
    case smActions.SET_PLACE:
      const place={...action.payload};
      return{
        ...state,place:place,mapPosition:{lat:place.lat,lng:place.lng}
      };
    case smActions.SET_CURRENT_PLACE:
      return{
        ...state,currentPlace:{...action.payload},selectedPlace:{...action.payload}
      };
    case smActions.ADD_TO_OLD_PLACES:
      return{
          ...state,oldPlaces:[...state.oldPlaces,action.payload]
      };
    case smActions.SET_PLACES:
      const cPlaces=[...action.payload];
      return{
        ...state,oldPlaces:cPlaces
      };
    case smActions.SET_TEMPORARY_SP:
      const selPlace={...action.payload}
      return{
        ...state,selectedPlace:selPlace,mapPosition:{lat:selPlace.lat,lng:selPlace.lng}
      };
    case smActions.STORE_SELECTED_PLACE:
      return{
        ...state,selectedPlace:{...action.payload}
      };
    case smActions.SET_SPA:
      return{
        ...state,selectedPlaceAdded:action.payload
      };
    case smActions.UPDATE_START_END:
      let startAt,endBefore,length;
      startAt=state.startAt;
      endBefore=state.endBefore;
      length=state.oldPlaces.length;
      if(30>=length){
        endBefore=length;
      }
      if(startAt<0){
        startAt=0;
      }
      if(action.payload==='+'){
        startAt+=10;
        endBefore+=10;
      }else{
        if(endBefore-startAt<30){
          endBefore=startAt;
        }else{
          endBefore-=10;
        }
        startAt-=10;
      }
      if(startAt>length){
        startAt=length-1;
      }
      if(endBefore<30){
        endBefore=30;
      }
      return{
        ...state,startAt:startAt,endBefore:endBefore
      };
    case smActions.RESET_START_END:
      return{
        ...state,startAt:0,endBefore:30
      };
    case smActions.VOID://return state for VOID & default ;p
    default:
      return state;
  }
}
