import {Injectable} from '@angular/core';
import {HttpInterceptor,HttpRequest,HttpHandler,HttpEvent} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {take,switchMap} from 'rxjs/operators';

import * as fromSM from '../search-maps/store/search-maps.reducers';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
  constructor(private store:Store<fromSM.FeatureState>){}

  intercept(req:HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>>{
    if(req.url==="https://proud-limiter-210411.firebaseio.com/places.json"){
      return this.store.select('auth').pipe(take(1),switchMap(
        (authState)=>{
          const copiedReq=req.clone({params:req.params.set('auth',authState.token)});
          return (next.handle(copiedReq));
        }
      ));
    }else{//Access-Control-Expose-Headers: Content-Length
      /*const copiedReq=req.clone({headers:req.headers.set('Access-Control-Allow-Origin','*')});
      console.log(copiedReq);*/
      return (next.handle(req));
    }
  }
}
