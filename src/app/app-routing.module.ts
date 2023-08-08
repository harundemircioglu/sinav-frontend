import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { UserComponent } from './admin/dashboard/user/user.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { TweetComponent } from './admin/dashboard/tweet/tweet.component';
import { AllUsersComponent } from './all-users/all-users.component';

const routes: Routes = [
  //LOGIN | REGISTER
  { path: '', component: LoginComponent },

  //DASHBOARD
  { path: 'dashboard', component: DashboardComponent },
  { path: 'dashboard/users', component: UserComponent },
  { path: 'dashboard/tweets', component: TweetComponent },

  //USER
  { path: 'home', component: HomeComponent },
  { path: 'all-users', component: AllUsersComponent },
  { path: 'profile', component: ProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
