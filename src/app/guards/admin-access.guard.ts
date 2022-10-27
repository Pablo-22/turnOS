import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { lastValueFrom, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAccessGuard implements CanActivate {

	constructor(private _auth:AuthService, private _router:Router){
	}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): boolean | UrlTree {
		if (this._auth.haveAdminAccess) {
			return true;
		}
		return this._router.parseUrl('/');
	}
}
