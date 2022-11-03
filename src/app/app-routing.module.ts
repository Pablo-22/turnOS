import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentsManagerComponent } from './components/appointments-manager/appointments-manager.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MyAppointmentsComponent } from './components/my-appointments/my-appointments.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { RequestAppointmentComponent } from './components/request-appointment/request-appointment.component';
import { SigninComponent } from './components/signin/signin.component';
import { UsersManagerComponent } from './components/users-manager/users-manager.component';
import { AdminAccessGuard } from './guards/admin-access.guard';

const routes: Routes = [
	{ path: 'login', component: LoginComponent },
	{ path: 'signin', component: SigninComponent },
	{ path: 'request-appointment', component: RequestAppointmentComponent },
	{ path: 'my-appointments', component: MyAppointmentsComponent },
	{ path: 'my-profile', component: MyProfileComponent },
	{ path: 'appointments-manager', canActivate: [AdminAccessGuard], component: AppointmentsManagerComponent },
	{ path: 'users-manager', canActivate: [AdminAccessGuard], component: UsersManagerComponent },
	{ path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
