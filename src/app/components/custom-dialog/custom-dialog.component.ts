import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DialogData } from 'src/app/entities/dialog-data';

@Component({
  selector: 'app-custom-dialog',
  templateUrl: './custom-dialog.component.html',
  styleUrls: ['./custom-dialog.component.scss']
})
export class CustomDialogComponent implements OnInit {

	@Input()
	data:DialogData = new DialogData;

	@Output() displayChanged = new EventEmitter<boolean>();

	constructor() { }

	ngOnInit(): void {
	}

	onClose(){
		this.displayChanged.emit(false);
	}

}
