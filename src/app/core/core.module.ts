import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS} from '@angular/common/http';

import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import {AppRoutingModule} from '../app-routing.module';
import {AuthInterceptor} from '../shared/auth.interceptor';

@NgModule({
  declarations:[
    HeaderComponent,
    HomeComponent
  ],
  imports:[
    CommonModule,
    AppRoutingModule
  ],
  exports:[
    AppRoutingModule,
    HeaderComponent
  ],
  providers:[
    {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}
  ]
})
export class CoreModule{}
