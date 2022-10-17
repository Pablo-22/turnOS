import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogData } from 'src/app/entities/dialog-data';
import { ServiceAuth } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	emailInputStr: string = '';
	passwordInputStr: string = '';
	isUserLogged: boolean = false;

	displayDialog:boolean = false;
	dialogData:DialogData = new DialogData();

	constructor(private _auth : ServiceAuth, private _router : Router) {}

	ngOnInit(): void {
		this.isLogged();
		this.dialogData.title = 'Error';
				this.dialogData.body = 'No se ha podido loguear correctamente. Por favor revise los datos ingresados e intente nuevamente.';
				this.dialogData.buttonText = 'Aceptar';
				this.displayDialog = true;
	}

	isLogged(){
		this._auth.getInfoUsuarioLoggeado().subscribe(res =>{
			if (res) {
				this.isUserLogged = true;
			}
		});
	}

	onLogin() {
		this._auth.login(this.emailInputStr, this.passwordInputStr).then(res=>{
			if (res) {
				this.isLogged();
				this._router.navigate(['/']);
			}else {
				this.dialogData.title = 'Error';
				this.dialogData.title = 'No se ha podido loguear correctamente. Por favor revise los datos ingresados e intente nuevamente.';
				this.dialogData.buttonText = 'Aceptar';
				this.displayDialog = true;
			}
		});
	}

	onAutocomplete() {
		this.emailInputStr = 'test@gmail.com';
		this.passwordInputStr = 'test12345';
	}

}
