import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {

  transform(value: Date): string {
    const dateString = value.toString();
    const dateSplit = dateString.split('-', 3);
    const result = (dateSplit[2] + '-' + dateSplit[1] + '-' + dateSplit[0]);
    return result;
  }

}
