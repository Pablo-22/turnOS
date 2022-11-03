import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  	name: 'day'
})
export class DayPipe implements PipeTransform {

  transform(dayIndex:number|undefined): string {
		if (dayIndex) {
			let dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado' ] 
			return dias[dayIndex];
		}
		return ''
  }

}
