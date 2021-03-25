import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customCurrencyRp'
})
export class CustomCurrencyRpPipe implements PipeTransform {

  transform(value: number): string {
    const batasan = value.toLocaleString();
    const reg = batasan.replace(/,/g, '.')
    const result = 'Rp.' + reg + ',00';
    return result;
  }

}
