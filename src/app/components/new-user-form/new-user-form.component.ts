import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/compat/storage';
import { Timestamp } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { DialogData } from 'src/app/entities/dialog-data';
import { Patient } from 'src/app/entities/patient';
import { Specialist } from 'src/app/entities/specialist';
import { User } from 'src/app/entities/user';
import { AuthService } from 'src/app/services/auth.service';
import { CloudStorageService } from 'src/app/services/cloud-storage.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ModalService } from 'src/app/services/modal.service';
import { UsersService } from 'src/app/services/users.service';
import { CustomDialogComponent } from '../custom-dialog/custom-dialog.component';

@Component({
	selector: 'app-new-user-form',
	templateUrl: './new-user-form.component.html',
	styleUrls: ['./new-user-form.component.scss'],
	providers: [DialogService]
})
export class NewUserFormComponent implements OnInit, OnChanges {

	form: FormGroup;

	@Input()
	userType:'SPECIALIST'|'ADMIN'|'PATIENT'|'' = '';

	@Input()
	showReturnButton:boolean = false;

	@Output() onReturn = new EventEmitter<boolean>();

	specialities:string[] = ['Pediatría', 'Psicología', 'Oftalmología', 'Otorrinolaringología', 'Cardiología' ]
	specialitySelected:string[] = [];

	    
	userBirthDate:Date = new Date();
	
	@ViewChild('fileUploader') fileUploader: any;
	userImages:File[] = [];
	currentFileRef:AngularFireStorageReference | undefined;


	constructor(
		private _auth:AuthService, 
		private _users:UsersService, 
		private _storage: CloudStorageService, 
		private _router: Router, 
		private _modalService:ModalService, 
		private _dialogService:DialogService,
		private _loaderService:LoaderService
	) {
		this.form = new FormGroup({
			name: new FormControl('', [Validators.required] ),
			surname: new FormControl('', [Validators.required] ),
			dni: new FormControl('', [Validators.required] ),
			healthInsurance: new FormControl({value: '', disabled: this.userType !== 'PATIENT'}, [Validators.required] ),
			email: new FormControl('', [Validators.required] ),
			password: new FormControl('', [Validators.required] ),
		});
	}

	ngOnInit(): void {
	}

	ngOnChanges() {
		switch (this.userType) {
	
			case 'PATIENT':
				this.form.controls['healthInsurance'].enable();
				break;
			default:
				this.form.controls['healthInsurance'].disable();
				break;
		}
	}

	onRegister(){
		this._loaderService.show();

		switch (this.userType) {
			case 'PATIENT': // PATIENT
				if (this.form.status != 'VALID') {
					this._loaderService.hide();

					this._modalService.dialogData.body = 'Por favor revise los datos ingresados. Todos los campos son obligatorios';
					this._dialogService.open(CustomDialogComponent, {data: this._modalService.dialogData, header: 'Error'});

					return;
				}

				let patient = new Patient()
				patient.dni = this.form.controls['dni'].value;
				patient.email = this.form.controls['email'].value;
				patient.healthInsurance = this.form.controls['healthInsurance'].value;
				patient.name = this.form.controls['name'].value;
				patient.surname = this.form.controls['surname'].value;
				patient.type = 'PATIENT'
				patient.password = this.form.controls['password'].value;

				let pDate = this.userBirthDate;
				pDate.setMinutes( pDate.getMinutes() + pDate.getTimezoneOffset() ); // Para corregir problemas de zona horaria
				pDate.setHours(0,0,0,0); // Setea el tiempo en 0

				patient.birthDate = Timestamp.fromDate(pDate);

				this._auth.signUp(patient.email, patient.password).then(async x => {
					if (x) {

						// UPLOAD IMAGE
						for (const image of this.userImages) {
							const imgURL = await this._storage.uploadFile(image)
							let imgStr = imgURL as string
							patient.images.push(imgStr)
						}
						// END UPLOAD IMAGE

						this._users.create(patient);
						let createdUser = this._auth.getCurrentUser();
						createdUser.then(x => {
							x?.sendEmailVerification().then(() => {
								this._loaderService.hide();

								this._modalService.dialogData.body = 'Se ha registrado tu cuenta. Se envió un email a tu correo electrónico con las instrucciones para verificar tu cuenta. No olvides revisar la carpeta de spam';

								this._dialogService.open(CustomDialogComponent, {data: this._modalService.dialogData, header: 'Verificación enviada'}).onClose.subscribe(() => {
									this._router.navigate(['/login'])
								});


							}).catch(() => {
								this._loaderService.hide();

								this._modalService.dialogData.body = 'No se ha podido enviar el email de verificación. Por favor revise los datos ingresados';
								this._dialogService.open(CustomDialogComponent, {data: this._modalService.dialogData, header: 'Error'});
							});
						})
					} else {
						this._loaderService.hide();
						this._modalService.dialogData.body = 'No se ha podido realizar el registro correctamente. Por favor verifique los datos ingresados. Puede que el email sea inválido o esté en uso.';
						this._dialogService.open(CustomDialogComponent, {data: this._modalService.dialogData, header: 'Error'});
					}
				})
				break;
			case 'SPECIALIST': // SPECIALIST

				if (this.form.status != 'VALID' || !this.specialitySelected) {
					this._loaderService.hide();

					this._modalService.dialogData.body = 'Por favor revise los datos ingresados. Todos los campos son obligatorios';
					this._dialogService.open(CustomDialogComponent, {data: this._modalService.dialogData, header: 'Error'});
					return;
				}

				let specialist = new Specialist()
				specialist.dni = this.form.controls['dni'].value;
				specialist.email = this.form.controls['email'].value;
				specialist.speciality = this.specialitySelected;
				specialist.name = this.form.controls['name'].value;
				specialist.surname = this.form.controls['surname'].value;
				specialist.type = 'SPECIALIST'
				specialist.password = this.form.controls['password'].value;

				let sDate = this.userBirthDate;
				sDate.setMinutes( sDate.getMinutes() + sDate.getTimezoneOffset() ); // Para corregir problemas de zona horaria
				sDate.setHours(0,0,0,0); // Setea el tiempo en 0

				specialist.birthDate = Timestamp.fromDate(sDate);

				this._auth.signUp(specialist.email, specialist.password).then(async x => {
					if (x) {

						// UPLOAD IMAGE
						for (const image of this.userImages) {
							const imgURL = await this._storage.uploadFile(image)
							let imgStr = imgURL as string
							specialist.images.push(imgStr)
						}
						// END UPLOAD IMAGE


						this._users.create(specialist);
						let createdUser = this._auth.getCurrentUser();
						createdUser.then(x => {
							x?.sendEmailVerification().then(() => {
								this._loaderService.hide();

								this._modalService.dialogData.body = 'Se ha registrado tu cuenta. Se envió un email a tu correo electrónico con las instrucciones para verificar tu cuenta. No olvides revisar la carpeta de spam';
								this._dialogService.open(CustomDialogComponent, {data: this._modalService.dialogData, header: 'Error'}).onClose.subscribe(() => {
									this._router.navigate(['/login'])
								});

							}).catch(() => {
								this._loaderService.hide();

								this._modalService.dialogData.body = 'No se ha podido enviar el email de verificación. Por favor revise los datos ingresados';
								this._dialogService.open(CustomDialogComponent, {data: this._modalService.dialogData, header: 'Error'});
							});
						})
					} else {
						this._loaderService.hide();
						
						this._modalService.dialogData.body = 'No se ha podido realizar el registro correctamente. Por favor verifique los datos ingresados. Puede que el email sea inválido o esté en uso.';
						this._dialogService.open(CustomDialogComponent, {data: this._modalService.dialogData, header: 'Error'});
					}
				})
				break;
			case 'ADMIN':
				if (this.form.status != 'VALID') {
					this._loaderService.hide();

					this._modalService.dialogData.body = 'Por favor revise los datos ingresados. Todos los campos son obligatorios';
					this._dialogService.open(CustomDialogComponent, {data: this._modalService.dialogData, header: 'Error'});

					return;
				}
				
				let admin = new User()
				admin.dni = this.form.controls['dni'].value;
				admin.email = this.form.controls['email'].value;
				admin.name = this.form.controls['name'].value;
				admin.surname = this.form.controls['surname'].value;
				admin.type = 'ADMIN'
				admin.password = this.form.controls['password'].value;
				admin.approvedProfile = true;

				let adminDate = this.userBirthDate;
				adminDate.setMinutes( adminDate.getMinutes() + adminDate.getTimezoneOffset() ); // Para corregir problemas de zona horaria
				adminDate.setHours(0,0,0,0); // Setea el tiempo en 0

				admin.birthDate = Timestamp.fromDate(adminDate);

				this._auth.signUp(admin.email, admin.password).then(async x => {
					if (x) {

						// UPLOAD IMAGE
						for (const image of this.userImages) {
							const imgURL = await this._storage.uploadFile(image)
							let imgStr = imgURL as string
							admin.images.push(imgStr)
						}
						// END UPLOAD IMAGE


						this._users.create(admin);
						let createdUser = this._auth.getCurrentUser();
						createdUser.then(x => {
							x?.sendEmailVerification().then(() => {
								this._loaderService.hide();

								this._modalService.dialogData.body = 'Se ha registrado la cuenta. Se envió un email al correo electrónico con las instrucciones para verificar la cuenta. Revisar la carpeta de spam';
								this._dialogService.open(CustomDialogComponent, {data: this._modalService.dialogData, header: 'Error'}).onClose.subscribe(() => {
									this._router.navigate(['/login'])
								});

							}).catch(() => {
								this._loaderService.hide();

								this._modalService.dialogData.body = 'No se ha podido enviar el email de verificación. Por favor revise los datos ingresados';
								this._dialogService.open(CustomDialogComponent, {data: this._modalService.dialogData, header: 'Error'});
							});
						})
					} else {
						this._loaderService.hide();
						
						this._modalService.dialogData.body = 'No se ha podido realizar el registro correctamente. Por favor verifique los datos ingresados. Puede que el email sea inválido o esté en uso.';
						this._dialogService.open(CustomDialogComponent, {data: this._modalService.dialogData, header: 'Error'});
					}
				})
			break;
		}
	}

	
	handleFileInput(files:File[]){
		this.userImages = [];
		let maxFileSizeExceeded = false;
		files.forEach(x => {
			if (x.size > 2000000) {
				maxFileSizeExceeded = true;
			}
		})
		if (maxFileSizeExceeded) {
			this._modalService.dialogData.body = 'Las imagenes no pueden exceder los 2 MB';
			this._dialogService.open(CustomDialogComponent, {data: this._modalService.dialogData, header: 'Error'});
			this.fileUploader.clear();
			return
		}

		switch (this.userType) {
			case 'PATIENT': // PATIENT

				if (files.length != 2) {
					this._modalService.dialogData.body = 'Debe seleccionar dos imágenes para completar el registro correctamente';
					this._dialogService.open(CustomDialogComponent, {data: this._modalService.dialogData, header: 'Error'});
					this.fileUploader.clear();
					return
				}
				break;
			default: // SPECIALIST, ADMIN

				if (files.length != 1) {
					this._modalService.dialogData.body = 'Debe seleccionar una imagen para completar el registro correctamente';
					this._dialogService.open(CustomDialogComponent, {data: this._modalService.dialogData, header: 'Error'});
					this.fileUploader.clear();
					return
				}
				break;
		}

		files.forEach((file:File) => {
			this.userImages.push(file);
		});

	}

	removeFile(file:File){
		this.userImages = this.userImages.filter((img:File) => { return img !== file });
	}

	goBack(){
		this.onReturn.emit(true);
	}
}
