import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';

@Component({
	selector: 'app-users-manager',
	templateUrl: './users-manager.component.html',
	styleUrls: ['./users-manager.component.scss']
})
export class UsersManagerComponent implements OnInit {
	
	users: any[] = [{name:'hola', description:'test'}];

	sortOptions: SelectItem[] = [];

    sortKey: string = '';

    sortField: string = '';

    sortOrder: number = 0;

	constructor() { }

	ngOnInit(): void {
	}

	onSortChange($event:any){
		let value = $event.value;

        if (value.indexOf('!') === 0) {
            this.sortOrder = -1;
            this.sortField = value.substring(1, value.length);
        }
        else {
            this.sortOrder = 1;
            this.sortField = value;
        }
	}
}
