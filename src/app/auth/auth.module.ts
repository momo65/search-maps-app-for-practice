import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import {AuthRoutingModule} from './auth-routing.module';
import { ChangePasswordComponent } from './profile/change-password/change-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations:[
    SignupComponent,
    SigninComponent,
    ChangePasswordComponent,
    ForgotPasswordComponent,
    ProfileComponent
  ],
  imports:[
    FormsModule,
    AuthRoutingModule
  ]
})
export class AuthModule{}
