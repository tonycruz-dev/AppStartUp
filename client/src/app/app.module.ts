import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import {JwtInterceptor} from './shared/interceptors/jwt.interceptor';
import {LoadingInterceptor} from './shared/interceptors/loading.interceptor';
import {ErrorInterceptor} from './shared/interceptors/rror.interceptor';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    NgxSpinnerModule,
  ],
  providers: [
     {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
     {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true},
     {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
