import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { DialogData } from 'src/app/entities/dialog-data';

@Component({
  selector: 'app-custom-dialog',
  templateUrl: './custom-dialog.component.html',
  styleUrls: ['./custom-dialog.component.scss']
})
export class CustomDialogComponent implements OnInit {

	data:DialogData = new DialogData;

	@Output() displayChanged = new EventEmitter<boolean>();

	constructor(public config: DynamicDialogConfig) {
		this.data = this.config.data;
	}

	ngOnInit(): void {
	}

	onClose(){
		if (this.data.onHideEvent) {
			this.data.onHideEvent();
		}
		this.displayChanged.emit(false);
	}

}
