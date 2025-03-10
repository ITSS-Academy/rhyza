import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'durationToTime',
  standalone: true
})
export class DurationToTimePipe implements PipeTransform {

  transform(value: number): string {
    if (!value || isNaN(value)) return '0:00';

    const minutes = Math.floor(value / 60);
    const seconds = Math.floor(value % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

}

