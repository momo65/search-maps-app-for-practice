import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';

import {SigninComponent} from './signin/signin.component';
import {SignupComponent} from './signup/signup.component';
import {ProfileComponent} from './profile/profile.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {AuthGuard} from './auth.guard';

const authRoutes:Routes=[
  {path:'signup',component:SignupComponent},
  {path:'signin',component:SigninComponent},
  {path:'forgot-password',component:ForgotPasswordComponent},
  {path:'profile',component:ProfileComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports:[
    RouterModule.forChild(authRoutes)
  ],
  exports:[
    RouterModule
  ],
  providers:[
    AuthGuard
  ]
})
export class AuthRoutingModule{}
