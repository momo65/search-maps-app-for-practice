import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';

import { AppComponent } from './app.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import{AppRoutingModule} from './app-routing.module';
import {reducers} from './store/app.reducers';
import {SharedModule} from './shared/shared.module';
import {SearchMapsModule} from './search-maps/search-maps.module';
import {CoreModule} from './core/core.module';
import {AuthModule} from './auth/auth.module';
import {AuthEffects} from './auth/store/auth.effects';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    SearchMapsModule,
    CoreModule,
    AuthModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AuthEffects])
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
