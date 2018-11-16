import { NgModule } from '@angular/core';
import { TranslateModule,TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { PipesModule } from '../modules/pipes.module';


import { uiCombo } from './ui/fields/combo/ui.combo';

export function createTranslateLoader(http: HttpClient) {
  const _dc = new Date().getTime();
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json?v=' + _dc);
}
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PipesModule,
    TranslateModule.forChild(),
    TextMaskModule
  ],
  declarations: [
    uiCombo,
  ],

  entryComponents: [],
  exports: [
    uiCombo,
    PipesModule,
    TranslateModule
    
  ],
  providers: [
]
})
export class ComponentsModule { }
