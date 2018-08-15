import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Actions,Effect} from '@ngrx/effects';
import * as firebase from 'firebase';
import {from} from 'rxjs';
import {map,switchMap,mergeMap,catchError} from 'rxjs/operators';

import * as authActions from './auth.actions';

@Injectable()
export class AuthEffects{
  constructor(private actions$:Actions,private router:Router){}

  @Effect()
  doSignup$=this.actions$.ofType(authActions.DO_SIGN_UP).pipe(map(
    (authAction:authActions.DoSignUp)=>{
      return authAction.payload;
    }
  ),switchMap(
    (actionData:{email:string,password:string})=>{
      return from(firebase.auth().createUserWithEmailAndPassword(actionData.email,actionData.password));
    }
  ),switchMap(
    ()=>{
      return from(firebase.auth().currentUser.getIdToken());
    }
  ),mergeMap(
    (token:string)=>{
      this.router.navigate(['/']);
      return[
        new authActions.SetToken(token),
        new authActions.SignUp()
      ]
    }
  ),catchError(
    (error,X)=>{
      console.log(error);
      return X;
    }
  ));

  @Effect()
  doSignin$=this.actions$.ofType(authActions.DO_SIGN_IN).pipe(map(
    (authAction:authActions.DoSignIn)=>{
      return authAction.payload;
    }
  ),switchMap(
    (actionData:{email:string,password:string})=>{
      return from(firebase.auth().signInWithEmailAndPassword(actionData.email,actionData.password));
    }
  ),switchMap(
    ()=>{
      return from(firebase.auth().currentUser.getIdToken());
    }
  ),mergeMap(
    (token:string)=>{
      this.router.navigate(['/']);// '/'
      return[
        new authActions.SetToken(token),
        new authActions.SignIn()
      ]
    }
  ),catchError(
    (error,X)=>{
      console.log(error);
      return X;
    }
  ));

  @Effect()
  doLogout=this.actions$.ofType(authActions.DO_LOGOUT).pipe(switchMap(
    (authAction:authActions.DoLogout)=>{
      return from(firebase.auth().signOut());
    }
  ),map(
    ()=>{
      return new authActions.Logout();
    }
  ),catchError(
    (error,X)=>{
      console.log(error);
      return X;
    }
  ));
}
