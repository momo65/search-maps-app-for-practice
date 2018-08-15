import {Injectable} from '@angular/core';
import {CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot} from '@angular/router';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import * as fromSM from '../search-maps/store/search-maps.reducers';

@Injectable()
export class AuthGuard implements CanActivate{
  constructor(private store:Store<fromSM.FeatureState>){}

  canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):Observable<boolean>{
    return this.store.select('auth').pipe(map(
      (authState)=>{
        return authState.authenticated;
      }
    ));
  }
}
