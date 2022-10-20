import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

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

	haveAdminAccess(){
		if (this.UserLogged && this._auth.currentUser?.type == 'ADMIN') {
			return true;
		}
		return false;
	}

}
