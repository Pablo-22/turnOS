export class User {
	id:string = '';
	email:string = '';
	password:string = '';
	type:'SPECIALIST'|'PATIENT'|'ADMIN'|'' = ''
	name:string = '';
	birthDate:Date = new Date();
	dni:string = '';
	emailVerified:boolean = false;
	approvedProfile:boolean = false;
	images: string[] = [];
}
