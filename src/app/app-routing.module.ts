import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SigninComponent } from './components/signin/signin.component';
import { UsersManagerComponent } from './components/users-manager/users-manager.component';
import { AdminAccessGuard } from './guards/admin-access.guard';

const routes: Routes = [
	{ path: 'login', component: LoginComponent },
	{ path: 'signin', component: SigninComponent },
	{ path: 'users-manager', canActivate: [AdminAccessGuard], component: UsersManagerComponent },
	{ path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
