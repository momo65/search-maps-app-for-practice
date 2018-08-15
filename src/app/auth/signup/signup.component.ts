import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {NgForm} from '@angular/forms';
import {take} from 'rxjs/operators';

import * as fromSM from '../../search-maps/store/search-maps.reducers';
import * as authActions from '../store/auth.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


  constructor(private store:Store<fromSM.FeatureState>) { }

  ngOnInit() {
  }

  onSignup(f:NgForm) {
    if(f.value.password===f.value.confirmPassword){
        this.store.dispatch(new authActions.DoSignUp({email:f.value.email,password:f.value.password}));
    }else{
      console.log("The passwords don't match with each others!");
    }
  }
}
