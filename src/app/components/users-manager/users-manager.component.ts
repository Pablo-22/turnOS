import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { User } from 'src/app/entities/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
	selector: 'app-users-manager',
	templateUrl: './users-manager.component.html',
	styleUrls: ['./users-manager.component.scss']
})
export class UsersManagerComponent implements OnInit {
	
	users: User[] = [];

	constructor(private _users:UsersService) { }

	ngOnInit(): void {
		this._users.getAll().subscribe(result => {
			this.users = result;
		})
	}

	updateUserStatus(user:User){
		this._users.update(user);
	}
}
