//Core and main services
import * as _ from 'lodash';
import { TextMaskModule } from 'angular2-text-mask';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';

import {Component, NgModule, Injectable, APP_INITIALIZER, Injector, ErrorHandler } from '@angular/core'
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { CustomFormsModule } from 'ng2-validation'
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PipesModule } from './modules/pipes.module';

//Base views
import { AppComponent } from './app.component';

export function createTranslateLoader(http: HttpClient) {
  const _dc = new Date().getTime();
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json?v=' + _dc);
}


@Injectable()
export class ConfigService {

  public config: {};
  public message: string;
  public langs: {};

  constructor(
    private translate: TranslateService,
    private http: HttpClient,
  ) {}

  load(): Promise<any> {
    return new Promise<boolean>(() => {
    });
  }
}

export function configServiceFactory(config: ConfigService) {
    return () => config.load();
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    CustomFormsModule,
    PipesModule,
    TranslateModule.forRoot({
      loader:{
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    TextMaskModule
  ],
  exports:[PipesModule],
  bootstrap: [AppComponent],
  providers: [
    DatePipe,
    ConfigService,
  ]
})
export class AppModule {
  public APP_CONFIG: {};

  constructor(configLoader: ConfigService) {
  }
}
