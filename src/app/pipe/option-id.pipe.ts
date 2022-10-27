import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'optionId'
})
export class OptionIdPipe implements PipeTransform {

  transform(prefix = 'option', i: number, j: number): unknown {
    return `${prefix}_${i}_${j}`;
  }

}
