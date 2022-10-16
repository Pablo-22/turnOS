import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
	selector: 'app-items-list',
	templateUrl: './items-list.component.html',
	styleUrls: ['./items-list.component.scss']
})
export class ItemsListComponent implements OnInit {

	@Input()
	title:string = 'Items'

	@Input()
	items:string[] = [ ]
	
	@Output() selectedItem = new EventEmitter<string>();
	selectedItemValue:string = ''

	@ViewChild('itemInput') emailInputElement!: ElementRef<HTMLInputElement>;

	

	constructor() { }

	ngOnInit(): void {
	}

	onItemSelected(item:string){
		this.selectedItemValue = item;
		this.selectedItem.emit(item);
	}

	onAddItem(item:string){
		if (item && !this.items.includes(item)) {
			this.items.push(item);
		}
	}

	focusItemInput(){
		this.emailInputElement.nativeElement.focus()
		console.log(this.emailInputElement.nativeElement.value)
	}

	getItemStyle(item:string){
		if (item == this.selectedItemValue) {
			return 'item-selected'
		}else {
			return 'chip'
		}
	}

}
