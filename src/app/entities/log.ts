export class Log {
	userId:string = '';
	createdDate:Date = new Date();
	value:string = ''

	constructor(value:string, userId:string){
		this.createdDate = new Date();
		this.value = value;
		this.userId = userId; 
	}
}
