import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor } from 'src/core/interceptors/jwt.interceptor';
import { LoginComponent } from './login/login.component';
import { MenubarModule } from 'primeng/menubar';
import { TopbarComponent } from './admin/topbar/topbar.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { UserComponent } from './admin/dashboard/user/user.component';
import { ProfileComponent } from './profile/profile.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TweetComponent } from './admin/dashboard/tweet/tweet.component';
import { HomeComponent } from './home/home.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TopbarComponent,
    DashboardComponent,
    UserComponent,
    ProfileComponent,
    NavbarComponent,
    TweetComponent,
    HomeComponent,
    AllUsersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MenubarModule,
    ToastModule,
    BrowserAnimationsModule,
    NoopAnimationsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
