import { Timestamp } from "@angular/fire/firestore";

export class User {
	id:string = '';
	email:string = '';
	password:string = '';
	type:'SPECIALIST'|'PATIENT'|'ADMIN'|'' = ''
	name:string = '';
	surname:string = '';
	birthDate:Timestamp = new Timestamp(0,0);
	dni:string = '';
	approvedProfile:boolean = false;
	images: string[] = [];
}
