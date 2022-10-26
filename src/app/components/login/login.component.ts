import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { DialogData } from 'src/app/entities/dialog-data';
import { LoginInput } from 'src/app/entities/login-input';
import { User } from 'src/app/entities/user';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ModalService } from 'src/app/services/modal.service';
import { UsersService } from 'src/app/services/users.service';
import { CustomDialogComponent } from '../custom-dialog/custom-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [DialogService]
})
export class LoginComponent implements OnInit {

	emailInputStr: string = '';
	passwordInputStr: string = '';
	isUserLogged: boolean = false;

	allUsers:Observable<User[]> = new Observable<User[]>()

	constructor(private _auth : AuthService, private _router : Router, private _users:UsersService, private _modalService:ModalService, private _dialogService:DialogService, private _loaderService:LoaderService) {
		this.allUsers = this._users.getAll()
	}

	ngOnInit(): void {
		this.isLogged();
	}

	isLogged(){
		this._auth.isUserLogged().subscribe(res =>{
			if (res) {
				this.isUserLogged = true;
			}
		});
	}

	async onLogin() {

		this._loaderService.show();

		if (!this.emailInputStr || !this.passwordInputStr) {
			this._loaderService.hide();
			return
		}

		let result = await this._users.getUserByEmail(this.emailInputStr)
		if (!result[0]) {
			this._loaderService.hide();
			this._modalService.dialogData.body = 'No se encontró el email ingresado. Por favor, revise los datos e intente nuevamente';
			this._dialogService.open(CustomDialogComponent, {data: this._modalService.dialogData, header: 'Error'});
			return;
		}

		let user = result[0];

		if (['ADMIN', 'SPECIALIST'].includes(user.type) && !user.approvedProfile) {
			this._loaderService.hide();
			this._modalService.dialogData.body = 'No se ha podido loguear correctamente. Su perfil aún no ha sido aprobado por un administrador.';
			this._dialogService.open(CustomDialogComponent, {data: this._modalService.dialogData, header: 'Error'});
			return;
		}

		this._auth.login(this.emailInputStr, this.passwordInputStr).then(res=>{
			if (res) {
				this._auth.getCurrentUser().then(user => {
					if(user?.emailVerified){
						this.isLogged();
						this._loaderService.hide();
						this._router.navigate(['/']);

					} else {
						user?.sendEmailVerification().then(() => {
							this._loaderService.hide();

							this._modalService.dialogData.body = 'No se ha podido iniciar sesión porque no se ha validado tu correo. Se envió un email a tu correo electrónico con las instrucciones para verificar tu cuenta. No olvides revisar la carpeta de spam';
							this._dialogService.open(CustomDialogComponent, {data: this._modalService.dialogData, header: 'Error'});

							this._auth.logOut();
						})
					}
				})
			} else {
				this._loaderService.hide();

				this._modalService.dialogData.body = 'No se ha podido loguear correctamente. Por favor revise los datos ingresados e intente nuevamente.';
				this._dialogService.open(CustomDialogComponent, {data: this._modalService.dialogData, header: 'Error'});
			}
		});
	}

	onAutocomplete(user:LoginInput) {
		this.emailInputStr = user.email;
		this.passwordInputStr = user.password;
	}

}
