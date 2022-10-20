import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

	userType:'SPECIALIST' | 'PATIENT' | 'ADMIN' | '' = '';

	displaySideBar:boolean = false;
	UserLogged:boolean = false;



	constructor(private _auth:AuthService) {
		this._auth.userLogged.subscribe(x => {
			if (x) {
				this.UserLogged = true;
			} else {
				this.UserLogged = false;
			}
		})
	}

	ngOnInit(): void {

	}

	onLogOut(){
		this._auth.logOut();
	}

	haveAdminAccess(){
		if (this.UserLogged && this._auth.currentUser?.type == 'ADMIN') {
			return true;
		}
		return false;
	}

}
