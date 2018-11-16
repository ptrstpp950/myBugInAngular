import { Injectable } from '@angular/core';
import { MoneyFormatterPipe } from '../pipes/money-formatter.pipe';


@Injectable()
export class AbstractPipe {
  constructor (
    public money: MoneyFormatterPipe,
  ) {}
}

