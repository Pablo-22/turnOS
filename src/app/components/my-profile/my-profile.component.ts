import { Component, OnInit } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { Patient } from 'src/app/entities/patient';
import { Specialist } from 'src/app/entities/specialist';
import { User } from 'src/app/entities/user';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
	selector: 'app-my-profile',
	templateUrl: './my-profile.component.html',
	styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

	currentUser:User|undefined;
	currentPatient:Patient|undefined;
	currentSpecialist:Specialist|undefined;

	constructor(private _auth:AuthService, private _loaderService:LoaderService) {
		this._loaderService.show()	
	}

	ngOnInit(): void {
		this._auth.currentUser$.subscribe(x => {
			this.currentUser = x as User;
			if (x?.type == 'PATIENT') {
				
				this.currentPatient = x as Patient;
			} else if(x?.type == 'SPECIALIST') {
				this.currentSpecialist = x as Specialist;
			}
			this._loaderService.hide();
		})
	}

	formatTimestampToDate(timestamp:Timestamp|undefined){
		if (timestamp) {
			return timestamp.toDate();
		}
		return '';
	}
}
