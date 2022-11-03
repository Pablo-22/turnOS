import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { SidebarModule } from 'primeng/sidebar';
import { MenuModule } from 'primeng/menu';
import {TreeModule} from 'primeng/tree';
import {InputTextModule} from 'primeng/inputtext';
import {TabViewModule} from 'primeng/tabview';
import {CalendarModule} from 'primeng/calendar';
import {FileUploadModule} from 'primeng/fileupload';
import { ChipModule } from 'primeng/chip';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {AutoFocusModule} from 'primeng/autofocus';
import {DataViewModule} from 'primeng/dataview';
import {DropdownModule} from 'primeng/dropdown';
import {DialogModule} from 'primeng/dialog';
import {CardModule} from 'primeng/card';
import {InputSwitchModule} from 'primeng/inputswitch';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {AvatarModule} from 'primeng/avatar';
import {AvatarGroupModule} from 'primeng/avatargroup';
import {StepsModule} from 'primeng/steps';
import {SelectButtonModule} from 'primeng/selectbutton';

@NgModule({
  declarations: [],
  exports: [
    CommonModule,
	ButtonModule,
	RippleModule,
	SidebarModule,
	MenuModule,
	TreeModule,
	InputTextModule,
	TabViewModule,
	CalendarModule,
	FileUploadModule,
	ChipModule,
	OverlayPanelModule,
	AutoFocusModule,
	DataViewModule,
	DropdownModule,
	DialogModule,
	CardModule,
	InputSwitchModule,
	ProgressSpinnerModule,
	AvatarModule,
	AvatarGroupModule,
	StepsModule,
	SelectButtonModule,
  ]
})
export class PrimeNgModule { }
