import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userType'
})
export class UserTypePipe implements PipeTransform {

  transform(value:string): string {
	let returnValue:string = '';
    switch (value) {
		case 'SPECIALIST':
			returnValue = 'Especialista'
			break;

		case 'PATIENT':
			returnValue = 'Paciente'
			break;

		case 'ADMIN':
			returnValue = 'Administrador'
			break;

		case '':
			returnValue = ''
			break;
	
		default:
			returnValue = 'Desconocido'
			break;
	}
	return returnValue;
  }

}
