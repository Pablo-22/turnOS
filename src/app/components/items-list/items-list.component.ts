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
	
	@Output() selectedItem = new EventEmitter<string[]>();
	selectedItems:string[] = []

	@ViewChild('itemInput') emailInputElement!: ElementRef<HTMLInputElement>;

	

	constructor() { }

	ngOnInit(): void {
	}

	onItemSelected(item:string){
		if (this.selectedItems.includes(item)) {
			this.selectedItems = this.selectedItems.filter(x => { return x !== item })
		} else {
			this.selectedItems.push(item);
		}
		this.selectedItem.emit(this.selectedItems);
	}

	onAddItem(item:string){
		if (item && !this.items.includes(item)) {
			this.items.push(item);
		}
	}

	focusItemInput(){
		this.emailInputElement.nativeElement.focus()
	}

	getItemStyle(item:string){
		if (this.selectedItems.includes(item)) {
			return 'item-selected'
		}else {
			return 'chip'
		}
	}

}
