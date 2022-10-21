import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/compat/storage';
import { Timestamp } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DialogData } from 'src/app/entities/dialog-data';
import { Patient } from 'src/app/entities/patient';
import { Specialist } from 'src/app/entities/specialist';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
	selector: 'app-new-user-form',
	templateUrl: './new-user-form.component.html',
	styleUrls: ['./new-user-form.component.scss']
})
export class NewUserFormComponent implements OnInit {

	displayDialog:boolean = false;
	dialogData:DialogData = new DialogData();

	form: FormGroup;
	userType:'SPECIALIST'|'ADMIN'|'PATIENT'|'' = '';

	specialities:string[] = ['Pediatría', 'Psicología', 'Oftalmología', 'Otorrinolaringología', 'Cardiología' ]
	specialitySelected:string = '';

	userImages:any[] = [];

	userBirthDate:Date = new Date();

	currentFileRef:AngularFireStorageReference | undefined;


	constructor(private _auth:AuthService, private _users:UsersService, private _storage: AngularFireStorage, private _router: Router) {
		this.form = new FormGroup({
			Name: new FormControl('', [Validators.required] ),
			Surname: new FormControl('', [Validators.required] ),
			Dni: new FormControl('', [Validators.required] ),
			HealthInsurance: new FormControl('', [Validators.required] ),
			Email: new FormControl('', [Validators.required] ),
			Password: new FormControl('', [Validators.required] ),
		});
	}

	ngOnInit(): void {
	}

	onRegister(){
		switch (this.userType) {
			case 'PATIENT': // PATIENT
				if (this.form.status != 'VALID') {
					this.dialogData.title = 'Error';
					this.dialogData.body = 'Por favor revise los datos ingresados. Todos los campos son obligatorios';
					this.dialogData.buttonText = 'Aceptar';
					this.displayDialog = true;

					return;
				}

				let patient = new Patient()
				patient.dni = this.form.controls['pDni'].value;
				patient.email = this.form.controls['pEmail'].value;
				patient.healthInsurance = this.form.controls['pHealthInsurance'].value;
				patient.name = this.form.controls['pName'].value;
				patient.surname = this.form.controls['pSurname'].value;
				patient.type = 'PATIENT'
				patient.password = this.form.controls['pPassword'].value;

				let pDate = this.userBirthDate;
				pDate.setMinutes( pDate.getMinutes() + pDate.getTimezoneOffset() ); // Para corregir problemas de zona horaria
				pDate.setHours(0,0,0,0); // Setea el tiempo en 0

				patient.birthDate = Timestamp.fromDate(pDate);

				this._auth.signUp(patient.email, patient.password).then(x => {
					console.log(x);
					if (x) {

						this._users.create(patient);
						let createdUser = this._auth.getCurrentUser();
						createdUser.then(x => {
							console.log('USUARIO CREADO', x);
							x?.sendEmailVerification().then(() => {
								this.dialogData.title = 'Verificación enviada';
								this.dialogData.body = 'Se ha registrado tu cuenta. Se envió un email a tu correo electrónico con las instrucciones para verificar tu cuenta. No olvides revisar la carpeta de spam';
								this.dialogData.buttonText = 'Aceptar';
								this.displayDialog = true;
								this.dialogData.onHideEvent = () => {
									this._router.navigate(['/login']);
								}


							}).catch(() => {
								this.dialogData.title = 'Error';
								this.dialogData.body = 'No se ha podido enviar el email de verificación. Por favor revise los datos ingresados';
								this.dialogData.buttonText = 'Aceptar';
								this.displayDialog = true;
							});
						})
					} else {

						this.dialogData.title = 'Error';
						this.dialogData.body = 'No se ha podido realizar el registro correctamente. Por favor verifique los datos ingresados. Puede que el email sea inválido o esté en uso.';
						this.dialogData.buttonText = 'Aceptar';
						this.displayDialog = true;
					}
				})
				break;
			case 'SPECIALIST': // SPECIALIST
				if (this.form.status != 'VALID' || !this.specialitySelected) {
					this.dialogData.title = 'Error';
					this.dialogData.body = 'Por favor revise los datos ingresados. Todos los campos son obligatorios';
					this.dialogData.buttonText = 'Aceptar';
					this.displayDialog = true;
					return;
				}

				let specialist = new Specialist()
				specialist.dni = this.form.controls['sDni'].value;
				specialist.email = this.form.controls['sEmail'].value;
				specialist.speciality = this.specialitySelected;
				specialist.name = this.form.controls['sName'].value;
				specialist.surname = this.form.controls['sSurname'].value;
				specialist.type = 'SPECIALIST'
				specialist.password = this.form.controls['sPassword'].value;

				let sDate = this.userBirthDate;
				sDate.setMinutes( sDate.getMinutes() + sDate.getTimezoneOffset() ); // Para corregir problemas de zona horaria
				sDate.setHours(0,0,0,0); // Setea el tiempo en 0

				specialist.birthDate = Timestamp.fromDate(sDate);

				this._auth.signUp(specialist.email, specialist.password).then(x => {
					console.log(x);
					if (x) {
						this._users.create(specialist);
						let createdUser = this._auth.getCurrentUser();
						createdUser.then(x => {
							x?.sendEmailVerification().then(() => {

								this.dialogData.title = 'Verificación enviada';
								this.dialogData.body = 'Se ha registrado tu cuenta. Se envió un email a tu correo electrónico con las instrucciones para verificar tu cuenta. No olvides revisar la carpeta de spam';
								this.dialogData.buttonText = 'Aceptar';
								this.displayDialog = true;

								this._router.navigate(['/login'])
							}).catch(() => {
								this.dialogData.title = 'Error';
								this.dialogData.body = 'No se ha podido enviar el email de verificación. Por favor revise los datos ingresados';
								this.dialogData.buttonText = 'Aceptar';
								this.displayDialog = true;
							});
						})
					} else {
						this.dialogData.title = 'Error';
						this.dialogData.body = 'No se ha podido realizar el registro correctamente. Por favor verifique los datos ingresados. Puede que el email sea inválido o esté en uso.';
						this.dialogData.buttonText = 'Aceptar';
						this.displayDialog = true;
					}
				})
				break;
		}
	}

	
	handleFileInput(event:any){
		
		switch (this.userType) {
			case 'PATIENT': // PATIENT

				if (event.files.length != 2 || !this.checkImages(event.files as FileList)) {
					this.dialogData.title = 'Error';
					this.dialogData.body = 'Debe seleccionar dos imágenes para completar el registro correctamente';
					this.dialogData.buttonText = 'Aceptar';
					this.displayDialog = true;
					return
				}
				this.userImages = []

				Object.entries(event.files).forEach(([key, file]) => {
					this.userImages.push(file);
				});

				break;
			case 'SPECIALIST': // SPECIALIST

				if (event.files.length != 1) {
					this.dialogData.title = 'Error';
					this.dialogData.body = 'Debe seleccionar una imagen para completar el registro correctamente';
					this.dialogData.buttonText = 'Aceptar';
					this.displayDialog = true;
					return
				}
				this.userImages = []
				
				Object.entries(event.files).forEach(([key, file]) => {
					this.userImages.push(file);
				});

				
				break;
		}

		console.log(event.files);
	}

	checkImages(files:FileList){
		console.log(files);
		let valid = true;
		Object.entries(files).forEach(([key, file]) => {
			console.log(key, ':', file)
			let type = file.type.split('/')[0];
			if (type != 'image') {
				valid = false;
			}
		});
			
		return valid;
	}

	uploadImage(file:File){
		const filePath = 'profileImg/' + file.name;
		this.currentFileRef = this._storage.ref(filePath);
		return this._storage.upload(filePath, file);
	}

}
