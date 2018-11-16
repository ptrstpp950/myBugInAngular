import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoneyFormatterPipe } from '../pipes/money-formatter.pipe';
import { AbstractPipe } from '../pipes/__abstract.pipe';
import { FilterPipe } from '../pipes/filter.pipe';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    MoneyFormatterPipe,
    FilterPipe,
  ],

  providers: [
    MoneyFormatterPipe,
    AbstractPipe,
    FilterPipe,

  ],
  exports: [
    MoneyFormatterPipe,
    FilterPipe
  ]

})
export class PipesModule { }