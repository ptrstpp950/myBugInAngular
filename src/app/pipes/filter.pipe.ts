import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter',
    pure: false
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], term, prevent): any {
    if(!term){
      items.filter((item)=>{ item['_visible'] = true; })
    }
    let filtered = items.filter((item)=>{
      item['_visible'] = item.value.toLowerCase().indexOf(term.toLowerCase()) !== -1;
      return item.value.toLowerCase().indexOf(term.toLowerCase()) !== -1
    });

    if(!filtered.length){
      items.filter((item)=>{ item['_visible'] = true; })
      return items
    }else{
      return filtered;
    }
  }
}

