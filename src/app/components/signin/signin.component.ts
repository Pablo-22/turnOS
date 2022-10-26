import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { DialogData } from 'src/app/entities/dialog-data';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  providers: [DialogService]
})
export class SigninComponent implements OnInit {
	
	displayDialog:boolean = false;
	dialogData:DialogData = new DialogData();
	displayForm:boolean = false;

	selectedUserType:'SPECIALIST'|'PATIENT'|'' = '';

	constructor() {
	}

	ngOnInit(): void {
	}
}
