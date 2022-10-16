import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
	displaySideBar:boolean = false;
	items: MenuItem[] = [];

	constructor() { }

	ngOnInit(): void {
		this.items = [
            {label: 'New', icon: 'pi pi-fw pi-plus'},
            {label: 'Open', icon: 'pi pi-fw pi-download'},
            {label: 'Undo', icon: 'pi pi-fw pi-refresh'}
        ];
	}

}
