import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PrimeNgModule } from './modules/prime-ng/prime-ng.module';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { SigninComponent } from './components/signin/signin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {HttpClientModule} from '@angular/common/http';
import { ItemsListComponent } from './components/items-list/items-list.component';
import { CommonModule } from '@angular/common';
import { UsersManagerComponent } from './components/users-manager/users-manager.component';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { CustomDialogComponent } from './components/custom-dialog/custom-dialog.component';
import { AuthService } from './services/auth.service';
import { NewUserFormComponent } from './components/new-user-form/new-user-form.component';
import { UserTypePipe } from './pipes/user-type.pipe';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ModalService } from './services/modal.service';
import { UsersDeckComponent } from './components/users-deck/users-deck.component';
import { MyAppointmentsComponent } from './components/my-appointments/my-appointments.component';
import { AppointmentsManagerComponent } from './components/appointments-manager/appointments-manager.component';
import { RequestAppointmentComponent } from './components/request-appointment/request-appointment.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { SpecialistAvailabilityComponent } from './components/specialist-availability/specialist-availability.component';
import { DayPipe } from './pipes/day.pipe';
import { TimePipe } from './pipes/time.pipe';

@NgModule({
  	declarations: [
		AppComponent,
		HomeComponent,
		NavbarComponent,
		LoginComponent,
		SigninComponent,
		ItemsListComponent,
		UsersManagerComponent,
  		CustomDialogComponent,
		NewUserFormComponent,
  		UserTypePipe,
    UsersDeckComponent,
    MyAppointmentsComponent,
    AppointmentsManagerComponent,
    RequestAppointmentComponent,
    MyProfileComponent,
    SpecialistAvailabilityComponent,
    DayPipe,
    TimePipe,
  	],
  	imports: [
		CommonModule,
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		AngularFireModule.initializeApp(environment.firebase),
		provideFirebaseApp(() => initializeApp(environment.firebase)),
		provideAuth(() => getAuth()),
		provideFirestore(() => getFirestore()),
		PrimeNgModule,
		HttpClientModule,
		provideStorage(() => getStorage()),
		AngularFireModule,
		AngularFireStorageModule,
		DynamicDialogModule,
	],
	providers: [AuthService, DynamicDialogModule],
	bootstrap: [AppComponent]
})
export class AppModule { }
