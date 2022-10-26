import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService, LoaderState } from 'src/app/services/loader.service';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

	userType:'SPECIALIST' | 'PATIENT' | 'ADMIN' | '' = '';

	displaySideBar:boolean = false;
	UserLogged:boolean = false;

	loading:boolean = false;
	haveAdminAccess:boolean = false



	constructor(private _auth:AuthService, private _loaderService:LoaderService) {
		this._auth.userLogged.subscribe(x => {
			if (x) {
				this.UserLogged = true;
			} else {
				this.UserLogged = false;
			}
		})

		this._loaderService.loaderState
            .subscribe((state: LoaderState) => {
                this.loading = state.show;
				console.log(state);
            });
		
		this.checkAdminAccess();
	}

	ngOnInit(): void {

	}

	onLogOut(){
		this._auth.logOut();
	}

	checkAdminAccess(){
		this._auth.haveAdminAccess$.subscribe(x => {
			this.haveAdminAccess = x;
		})
	}
}
