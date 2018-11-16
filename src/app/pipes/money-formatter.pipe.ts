import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'moneyFormatter'
})
export class MoneyFormatterPipe implements PipeTransform {

  transform(value: any, hideLabel?: boolean, decimal?: boolean): any {
    if(value){

      if("number" === typeof value){ value = value.toFixed(2); }

      value = value.replace(/\./g,',')
      value = value.replace(/[^0-9\,]/g, "");
      let parts = value.split(',');
      parts[0] = parts[0].replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, "$& ");
      value = parts[0];

      if(decimal){
        value = parts[1] ? value+","+parts[1] : value+",00";
      }
      if(!hideLabel){ value += " PLN";  }
    }
    return value;
  }

  parse(value:any){
    return value.replace(/ PLN/g, "").replace(/ /g, "");
  }

}
