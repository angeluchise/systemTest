import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'forPrice'
})
export class ForPricePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return new Intl.NumberFormat('de-DE').format(Number(value));
  }

}
