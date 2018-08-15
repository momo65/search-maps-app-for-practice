import {Action} from '@ngrx/store';

import {Place} from '../../shared/place.model';

export const SET_PLACE="SET_PLACE";
export const SET_CURRENT_PLACE="SET_CURRENT_PLACE";
export const DO_STORE="DO_STORE";
export const DO_FETCH="DO_FETCH";
export const ADD_TO_OLD_PLACES="ADD_TO_OLD_PLACES";
export const SET_PLACES="SET_PLACES";
export const SET_TEMPORARY_SP="SET_TEMPORARY_SP";
export const DO_FETCH_SELECTED_PLACE="DO_FETCH_SELECTED_PLACE";
export const STORE_SELECTED_PLACE="STORE_SELECTED_PLACE";
export const DO_STORE_SELECTED_PLACE="DO_STORE_SELECTED_PLACE";
export const VOID="VOID";// it's the action that take the place of a null action
export const SET_SPA="SET_SPA";
export const UPDATE_START_END="UPDATE_START_END";
export const RESET_START_END="RESET_START_END";

export class SetPlace implements Action{
  readonly type=SET_PLACE;

  constructor(public payload:Place){}
}

export class SetCurrentPlace implements Action{
  readonly type=SET_CURRENT_PLACE;

  constructor(public payload:Place){}
}

export class DoStore implements Action{
  readonly type=DO_STORE;

  constructor(public payload:Place){}
}

export class DoFetch implements Action{
  readonly type=DO_FETCH;

  constructor(public payload:{startAt:number,endBefore:number}){}
}

export class AddToOldPlaces implements Action{
  readonly type=ADD_TO_OLD_PLACES;

  constructor(public payload:Place){}
}

export class SetPlaces implements Action{
  readonly type=SET_PLACES;

  constructor(public payload:any[]){}
}

export class SetTemporarySP implements Action{
  readonly type=SET_TEMPORARY_SP;

  constructor(public payload:Place){}
}

export class DoFetchSelectedPlace implements Action{
  readonly type=DO_FETCH_SELECTED_PLACE;

  constructor(public payload:{lat:number,lng:number}){}
}

export class StoreSelectedPlace implements Action{
  readonly type=STORE_SELECTED_PLACE;

  constructor(public payload:any){}
}

export class DoStoreSelectedPlace implements Action{
  readonly type=DO_STORE_SELECTED_PLACE;
}

export class Void implements Action{ // it's the action that take the place of a null action
  readonly type=VOID;

  constructor(public payload:string){
    console.log(payload);
  }
}

export class SetSPA implements Action{
  readonly type=SET_SPA;

  constructor(public payload:boolean){}
}

export class UpdateStartEnd implements Action{
  readonly type=UPDATE_START_END;

  constructor(public payload:string){}
}

export class ResetStartEnd implements Action{
  readonly type=RESET_START_END;
}

export type SMActions=SetPlace|SetCurrentPlace|DoStore|DoFetch|AddToOldPlaces|SetPlaces|SetTemporarySP|
  DoFetchSelectedPlace|StoreSelectedPlace|DoStoreSelectedPlace|Void|SetSPA|UpdateStartEnd|ResetStartEnd;
