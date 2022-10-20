import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import firebase from "@firebase/app-compat";
import { User } from "../entities/user";
import { UsersService } from "./users.service";
import { lastValueFrom } from "rxjs";

@Injectable()
export class AuthService {

	userLogged = this._auth.authState;
	currentUser:User|undefined;
	emailVerified:boolean = false;
	accountVerified:boolean = false;

    
    constructor(private _auth : AngularFireAuth, private _usersService:UsersService){
	}

    async login(email: string, password: string){
        try{
            let result:any = await this._auth.signInWithEmailAndPassword(email, password);
			
			let user:User = new User();
			user.email = email;

			this._usersService.getUserByEmail(email).then(user => {
				this.currentUser = user[0];
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
			
			let user:User = new User();
			user.email = email;

			this._usersService.create(user);

			return result;
        }
        catch(error) {
            //alert("No se ha podido hacer el registro correctamente. Error: " + error)
            //console.log("No se ha podido hacer el registro correctamente. Error: " + error);
            return null;
        }
	}
   
	logOut(){
		this._auth.signOut();
	}

    isUserLogged(){
        return this._auth.authState;
    }

	getCurrentUser(){
		return this._auth.currentUser;
	}
}