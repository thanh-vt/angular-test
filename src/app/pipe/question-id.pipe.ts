import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'questionId'
})
export class QuestionIdPipe implements PipeTransform {

  transform(prefix = 'question', i: number): unknown {
    return `${prefix}_${i}`;
  }

}
