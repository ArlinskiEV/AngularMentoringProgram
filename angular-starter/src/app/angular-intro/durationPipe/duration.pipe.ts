import {
  Pipe,
  PipeTransform,
} from '@angular/core';

@Pipe({
  name: 'myDurations',
  pure: true,
})
export class DurationPipe implements PipeTransform {
  public transform(time: number): string {
    return 'noMoreTime';
  }
}
