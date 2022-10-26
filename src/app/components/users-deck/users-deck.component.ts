import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginInput } from 'src/app/entities/login-input';
import { Patient } from 'src/app/entities/patient';
import { Specialist } from 'src/app/entities/specialist';
import { User } from 'src/app/entities/user';

@Component({
	selector: 'app-users-deck',
	templateUrl: './users-deck.component.html',
	styleUrls: ['./users-deck.component.scss']
})
export class UsersDeckComponent implements OnInit {

	@Output() userSelected = new EventEmitter<LoginInput>();

	@Input()
	users:Observable<User[]> = new Observable<User[]>()

	admins:User[] = []
	specialists:Specialist[] = []
	patients:Patient[] = []

	constructor() { }

	ngOnInit(): void {
		this.users.subscribe(x => {
			this.admins = this.getUsersOfType(x, 'ADMIN', 1);
			this.specialists = this.getUsersOfType(x, 'SPECIALIST', 2) as Specialist[]
			this.patients = this.getUsersOfType(x, 'PATIENT', 3) as Patient[]
		})
		
	}

	onUserSelected(user:User){
		let loginData = new LoginInput()
		loginData.email = user.email
		loginData.password = user.password
		this.userSelected.emit(loginData);
	}

	getUsersOfType(users:User[], type:'ADMIN'|'PATIENT'|'SPECIALIST' , amount:number){
		let filteredUsers = users.filter(user => { return user.type == type })
		let slicedUsers = filteredUsers.slice(0, amount);

		return slicedUsers
	}
}
