import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogData } from 'src/app/entities/dialog-data';
import { ServiceAuth } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

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

	constructor(private _auth : ServiceAuth, private _router : Router, private _users:UsersService) {}

	ngOnInit(): void {
		this.isLogged();
	}

	isLogged(){
		this._auth.getInfoUsuarioLoggeado().subscribe(res =>{
			if (res) {
				this.isUserLogged = true;
			}
		});
	}

	async onLogin() {
		if (!this.emailInputStr || !this.passwordInputStr) {
			return
		}

		let result = await this._users.getUserByEmail(this.emailInputStr)
		if (!result[0]) {
			this.dialogData.title = 'Error';
			this.dialogData.body = 'No se encontró el email ingresado. Por favor, revise los datos e intente nuevamente';
			this.dialogData.buttonText = 'Aceptar';
			this.displayDialog = true;
			return;
		}

		let user = result[0];

		if (!user.emailVerified) {
			this.dialogData.title = 'Error';
			this.dialogData.body = 'No se ha podido loguear correctamente. Debe verificar su mail para poder acceder.';
			this.dialogData.buttonText = 'Aceptar';
			this.displayDialog = true;
			return;
		}

		if (['ADMIN', 'SPECIALIST'].includes(user.type) && !user.approvedProfile) {
			this.dialogData.title = 'Error';
			this.dialogData.body = 'No se ha podido loguear correctamente. Su perfil aún no ha sido aprobado por un administrador.';
			this.dialogData.buttonText = 'Aceptar';
			this.displayDialog = true;
			return;
		}

		this._auth.login(this.emailInputStr, this.passwordInputStr).then(res=>{
			if (res) {
				this.isLogged();
				this._router.navigate(['/']);
			} else {
				this.dialogData.title = 'Error';
				this.dialogData.body = 'No se ha podido loguear correctamente. Por favor revise los datos ingresados e intente nuevamente.';
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
