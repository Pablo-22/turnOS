import { Injectable } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { CustomDialogComponent } from '../components/custom-dialog/custom-dialog.component';
import { DialogData } from '../entities/dialog-data';

@Injectable({
  	providedIn: 'root',
})
export class ModalService {

	dialogData:DialogData = new DialogData()

	constructor() {
	}
}
