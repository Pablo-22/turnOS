import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { User } from 'src/app/entities/user';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService, LoaderState } from 'src/app/services/loader.service';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

	currentUser: User | undefined;

	displaySideBar:boolean = false;
	UserLogged:boolean = false;

	loading:boolean = false;



	constructor(private _auth:AuthService, private _loaderService:LoaderService, private _router:Router) {
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
            });
		
		this.checkAdminAccess();
	}

	ngOnInit(): void {

	}

	onLogOut(){
		this._auth.logOut();
		this._router.navigate(['/']);

	}

	checkAdminAccess(){
		this._auth.currentUser$.subscribe(x => {
			this.currentUser = Object.assign(new User, x);
		})
	}
}
