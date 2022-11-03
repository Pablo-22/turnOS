import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import firebase from "@firebase/app-compat";
import { User } from "../entities/user";
import { UsersService } from "./users.service";
import { BehaviorSubject, lastValueFrom, Observable, Subject } from "rxjs";

@Injectable()
export class AuthService {

	userLogged = this._auth.authState;
	emailVerified:boolean = false;
	accountVerified:boolean = false;
	
	private currentUserAccessSubject = new BehaviorSubject<User|undefined>({} as User);
    currentUser$ = this.currentUserAccessSubject.asObservable();
    currentUser: User|undefined;

    
    constructor(private _auth : AngularFireAuth, private _usersService:UsersService){
		this.isUserLogged().subscribe(x => {
			if (x) {
				this._usersService.getUserByEmail(x.email?? '').then(user => {
					this.currentUserAccessSubject.next(user[0] as User);
				});
			}
		});

		this.currentUser$.subscribe(x => {
			this.currentUser = x as User
		})
	}

    async login(email: string, password: string){
        try{
            let result:any = await this._auth.signInWithEmailAndPassword(email, password);
			
			let user:User = new User();
			user.email = email;

			this._usersService.getUserByEmail(email).then(user => {
				this.currentUserAccessSubject.next(user[0] as User);
			});

			//this._usersService.pushLoginLog(user);
			
			return result;
        }
        catch(error) {
            //alert("No se ha podido hacer el log-in correctamente. Error: " + error)
            //console.log("No se ha podido hacer el log-in correctamente. Error: " + error);
            return null;
        }
      }
   
	async loginGoogle(email: string, password: string){
		try{
			return await this._auth.signInWithPopup( new firebase.auth.GoogleAuthProvider());
		}
		catch(error) {
			//alert("No se ha podido hacer el log-in correctamente. Error: " + error)
			//console.log("No se ha podido hacer el log-in correctamente. Error: " + error);
			return null;
		}
	}

	async signUp(email: string, password: string){
        try{
            let result:any = await this._auth.createUserWithEmailAndPassword(email, password);

			return result;
        }
        catch(error) {
            //alert("No se ha podido hacer el registro correctamente. Error: " + error)
            //console.log("No se ha podido hacer el registro correctamente. Error: " + error);
            return null;
        }
	}
   
	logOut(){
		this.currentUserAccessSubject.next(undefined);
		this._auth.signOut();
	}

    isUserLogged(){
        return this._auth.authState;
    }

	getCurrentUser(){
		return this._auth.currentUser;
	}
}