import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

	birthDate:Date = new Date()

	patientForm: FormGroup;
	specialistForm: FormGroup;

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

}
