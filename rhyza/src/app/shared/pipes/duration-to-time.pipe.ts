import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'durationToTime',
  standalone: true
})
export class DurationToTimePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
