import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { lastValueFrom } from 'rxjs';
import { DayAvailability } from 'src/app/entities/day-availability';
import { SpecialistAvailability } from 'src/app/entities/specialist-availability';
import { Time } from 'src/app/entities/time';
import { TimeRange } from 'src/app/entities/time-range';
import { AuthService } from 'src/app/services/auth.service';
import { ModalService } from 'src/app/services/modal.service';
import { UsersService } from 'src/app/services/users.service';
import { CustomDialogComponent } from '../custom-dialog/custom-dialog.component';

@Component({
	selector: 'app-specialist-availability',
	templateUrl: './specialist-availability.component.html',
	styleUrls: ['./specialist-availability.component.scss'],
	providers: [DialogService]
})
export class SpecialistAvailabilityComponent implements OnInit {

	days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
	selectedDays:string[] = []

	fromTime:string = ''
	toTime:string = ''

	currentUserAvailability:SpecialistAvailability = new SpecialistAvailability()

	constructor(
		private _auth:AuthService, 
		private _modalService:ModalService, 
		private _dialogService:DialogService,
		private _usersService:UsersService
	) {
	}

	ngOnInit(): void {
		this._auth.currentUser$.subscribe(x => {
			this._usersService.getAvailabilityOfUser(x?.id ?? '').then(y => {
				y.forEach((s:SpecialistAvailability) => {
					let newObj = Object.assign(new SpecialistAvailability, s)
					this.currentUserAvailability = newObj;

					console.log('Turnos disponibles: ', SpecialistAvailability.getAvailableAppointments(this.currentUserAvailability, 15))
				})
			})
		})
	}

	async onAdd(){
		let isNewAvailability:boolean = this.currentUserAvailability.id? false : true;

		let from = new Time()
		from.setHours(parseInt(this.fromTime.split(':')[0]))
		from.setMinutes(parseInt(this.fromTime.split(':')[1]))

		let to = new Time()
		to.setHours(parseInt(this.toTime.split(':')[0]))
		to.setMinutes(parseInt(this.toTime.split(':')[1]))

		let timeRange = new TimeRange()
		timeRange.from = from;
		timeRange.to = to;

		if (from.isBiggerThan(to) || from.isEqualThan(to)) {
			this._modalService.dialogData.body = 'El horario "desde" no puede ser mayor a "hasta", y tampoco pueden ser iguales.'
			this._dialogService.open(CustomDialogComponent, {data: this._modalService.dialogData, header: 'Error'});
			return 
		}

		if (!this.selectedDays) {
			this._modalService.dialogData.body = 'Debe seleccionar al menos un día.'
			this._dialogService.open(CustomDialogComponent, {data: this._modalService.dialogData, header: 'Error'});
			return 
		}

		let daysAvailability:DayAvailability[] = [] 
		this.selectedDays.forEach(selectedDay => {
			let dayIndex = this.days.indexOf(selectedDay)

			let dayAvailability = new DayAvailability()
			dayAvailability.dayIndex = dayIndex 
			dayAvailability.range = timeRange

			daysAvailability.push(dayAvailability)
		});

		this.currentUserAvailability.daysAvailability.push(...daysAvailability)
		this._auth.currentUser$.subscribe(x => {
			if (x) {
				this.currentUserAvailability.userId = x.id
				if (isNewAvailability) {
					this.currentUserAvailability.id = this._usersService.pushAvailability(this.currentUserAvailability);
				} else {
					this._usersService.updateAvailability(this.currentUserAvailability);
				}
			}
		})

		this.selectedDays = []
	}
}
