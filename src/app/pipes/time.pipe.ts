import { Pipe, PipeTransform } from '@angular/core';
import { Time } from '../entities/time';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(time:Time): string {
	let finalString = ''
	if (time.hours < 10) {
		finalString += '0' + time.hours
	}else {
		finalString += time.hours
	}

	finalString += ':'

	if (time.minutes < 10) {
		finalString += '0' + time.minutes
	}else {
		finalString += time.minutes
	}
	
    return finalString;
  }

}
