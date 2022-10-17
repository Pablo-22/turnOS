import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import firebase from "@firebase/app-compat";
import { User } from "../entities/user";
import { UsersService } from "./users.service";
import { lastValueFrom } from "rxjs";

@Injectable()
export class ServiceAuth {
    
    constructor(private _auth : AngularFireAuth, private _usersService:UsersService){}

    async login(email: string, password: string){
        try{
            let result:any = await this._auth.signInWithEmailAndPassword(email, password);
			
			let user:User = new User();
			user.email = email;

			this._usersService.pushLoginLog(user);
			
			return result;
        }
        catch(error) {
            alert("No se ha podido hacer el log-in correctamente. Error: " + error)
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

	async registro(email: string, password: string){
        try{
            let result:any = await this._auth.createUserWithEmailAndPassword(email, password);
			
			let user:User = new User();
			user.email = email;

			this._usersService.create(user);

			return result;
        }
        catch(error) {
            alert("No se ha podido hacer el registro correctamente. Error: " + error)
            //console.log("No se ha podido hacer el registro correctamente. Error: " + error);
            return null;
        }
	}
   
	logOut(){
		this._auth.signOut();
	}

    getInfoUsuarioLoggeado(){
        return this._auth.authState;
    }
}