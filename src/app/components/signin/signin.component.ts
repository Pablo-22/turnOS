import { Component, OnInit } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DialogData } from 'src/app/entities/dialog-data';
import { Patient } from 'src/app/entities/patient';
import { Specialist } from 'src/app/entities/specialist';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

	displayDialog:boolean = false;
	dialogData:DialogData = new DialogData();

	pBirthDate:Date = new Date()
	sBirthDate:Date = new Date()

	patientForm: FormGroup;
	specialistForm: FormGroup;

	specialities:string[] = ['Pediatría', 'Psicología', 'Oftalmología', 'Otorrinolaringología', 'Cardiología' ]
	specialitySelected:string = '';

	formIndex:number = 0; // 0 = 'PATIENT'   1 = 'SPECIALIST'


	patientImages:any[] = [];
	specialistImages:any[] = [];
	

	constructor(private _auth:AuthService, private _users:UsersService) {
		this.patientForm = new FormGroup({
			pName: new FormControl('', [Validators.required] ),
			pSurname: new FormControl('', [Validators.required] ),
			pDni: new FormControl('', [Validators.required] ),
			pHealthInsurance: new FormControl('', [Validators.required] ),
			pEmail: new FormControl('', [Validators.required] ),
			pPassword: new FormControl('', [Validators.required] ),
		});

		this.specialistForm = new FormGroup({
			sName: new FormControl('', [Validators.required] ),
			sSurname: new FormControl('', [Validators.required] ),
			sDni: new FormControl('', [Validators.required] ),
			sEmail: new FormControl('', [Validators.required] ),
			sPassword: new FormControl('', [Validators.required] ),
		});
	}

	ngOnInit(): void {
	}

	onBasicUpload($event:any){
		console.log($event);
	}

	onRegister(){
		switch (this.formIndex) {
			case 0: // PATIENT
				if (this.patientForm.status != 'VALID') {
					this.dialogData.title = 'Error';
					this.dialogData.body = 'Por favor revise los datos ingresados. Todos los campos son obligatorios';
					this.dialogData.buttonText = 'Aceptar';
					this.displayDialog = true;
					return;
				}

				let patient = new Patient()
				patient.dni = this.patientForm.controls['pDni'].value;
				patient.email = this.patientForm.controls['pEmail'].value;
				patient.healthInsurance = this.patientForm.controls['pHealthInsurance'].value;
				patient.name = this.patientForm.controls['pName'].value;
				patient.surname = this.patientForm.controls['pSurname'].value;
				patient.type = 'PATIENT'
				patient.password = this.patientForm.controls['pPassword'].value;

				let pDate = this.pBirthDate;
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
			case 1: // SPECIALIST
				if (this.specialistForm.status != 'VALID' || !this.specialitySelected) {
					this.dialogData.title = 'Error';
					this.dialogData.body = 'Por favor revise los datos ingresados. Todos los campos son obligatorios';
					this.dialogData.buttonText = 'Aceptar';
					this.displayDialog = true;
					return;
				}

				let specialist = new Specialist()
				specialist.dni = this.specialistForm.controls['pDni'].value;
				specialist.email = this.specialistForm.controls['pEmail'].value;
				specialist.speciality = this.specialitySelected;
				specialist.name = this.specialistForm.controls['pName'].value;
				specialist.surname = this.specialistForm.controls['pSurname'].value;
				specialist.type = 'PATIENT'
				specialist.password = this.specialistForm.controls['pPassword'].value;

				let sDate = this.sBirthDate;
				sDate.setMinutes( sDate.getMinutes() + sDate.getTimezoneOffset() ); // Para corregir problemas de zona horaria
				sDate.setHours(0,0,0,0); // Setea el tiempo en 0

				specialist.birthDate = Timestamp.fromDate(sDate);

				this._auth.signUp(specialist.email, specialist.password).then(x => {
					console.log(x);
					if (x) {
						this._users.create(specialist);
						let createdUser = this._auth.getCurrentUser();
						createdUser.then(x => {
							console.log('USUARIO CREADO', x);
							x?.sendEmailVerification().then(() => {
								this.dialogData.title = 'Verificación enviada';
								this.dialogData.body = 'Se ha registrado tu cuenta. Se envió un email a tu correo electrónico con las instrucciones para verificar tu cuenta. No olvides revisar la carpeta de spam';
								this.dialogData.buttonText = 'Aceptar';
								this.displayDialog = true;
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
		if (event.files.length > 2) {
			alert("Only 5 files accepted.");
			return
		}
		switch (this.formIndex) {
			case 0: // PATIENT
				this.patientImages.push(event.files);
				console.log(this.patientImages);
				break;
			case 1: // SPECIALIST
				this.specialistImages.push(event.files);
				break;
		}

		console.log(event.files);
	}
}
