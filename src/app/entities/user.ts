
export class User {
	id:string = '';
	email:string = '';
	password:string = '';
	type:'SPECIALIST'|'PATIENT'|'ADMIN'|'' = ''
	name:string = '';
	borningDate:Date = new Date();
	dni:string = '';
	images: string[] = [];
}
