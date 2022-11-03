import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { DialogData } from './entities/dialog-data';
import { Time } from './entities/time';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	title = 'turnOS';
	displaySideBar:boolean = false;
	
	constructor(private primengConfig: PrimeNGConfig){
	}

	ngOnInit() {
        this.primengConfig.ripple = true;
    }
}
