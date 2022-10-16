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
import { FormsModule } from '@angular/forms';

import {HttpClientModule} from '@angular/common/http';
import { ItemsListComponent } from './components/items-list/items-list.component';
import { CommonModule } from '@angular/common';
import { UsersManagerComponent } from './components/users-manager/users-manager.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    LoginComponent,
    SigninComponent,
    ItemsListComponent,
    UsersManagerComponent
  ],
  imports: [
	CommonModule,
    BrowserModule,
	BrowserAnimationsModule,
    AppRoutingModule,
	FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    PrimeNgModule,
	HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
