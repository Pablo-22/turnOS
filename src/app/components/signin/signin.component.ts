import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Patient } from 'src/app/entities/patient';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

	birthDate:Date = new Date()

	patientForm: FormGroup;
	specialistForm: FormGroup;

	specialities:string[] = ['Pediatría', 'Psicología', 'Oftalmología', 'Otorrinolaringología', 'Cardiología' ]
	formIndex:number = 0; // 0 = 'PATIENT'   1 = 'SPECIALIST'

	constructor() {
		this.patientForm = new FormGroup({
			pName: new FormControl('', [Validators.required] ),
			pLastName: new FormControl('', [Validators.required] ),
			pDni: new FormControl('', [Validators.required] ),
			pHealthInsurance: new FormControl('', [Validators.required] ),
			pBirthDate: new FormControl('', [Validators.required] ),
			pEmail: new FormControl('', [Validators.required] ),
			pPassword: new FormControl('', [Validators.required] ),
		});

		this.specialistForm = new FormGroup({
			sName: new FormControl('', [Validators.required] ),
			sLastName: new FormControl('', [Validators.required] ),
			sDni: new FormControl('', [Validators.required] ),
			sBirthDate: new FormControl('', [Validators.required] ),
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
				let patient = new Patient()
				patient.dni = this.patientForm.controls['pDni'].value;
				patient.email = this.patientForm.controls['pEmail'].value;
				patient.healthInsurance = this.patientForm.controls['pDni'].value;
				patient.name = this.patientForm.controls['pDni'].value;
				patient.type = 'PATIENT'
				patient.password = this.patientForm.controls['pPassword'].value;
				patient.birthDate = this.patientForm.controls['sBirthDate'].value;

				console.log(patient);
				break;
			case 1: // SPECIALIST
			
				break;
		}
	}
}
