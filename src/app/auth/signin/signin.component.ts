import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Store} from '@ngrx/store';
import {take} from 'rxjs/operators';

import * as fromSM from '../../search-maps/store/search-maps.reducers';
import * as authActions from '../store/auth.actions';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private store:Store<fromSM.FeatureState>) { }

  ngOnInit() {
  }

  onSignin(f:NgForm){
    this.store.dispatch(new authActions.DoSignIn({email:f.value.email,password:f.value.password}));
  }

}
