import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/core/services/auth/auth.service';
import { User } from 'src/core/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(
    private authService: AuthService,
    public router: Router
  ) { }

  currentUser: User | null = null;


  logout() {
    this.authService.logOut();
    this.router.navigate(['/']);
  }

  ngOnInit() {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
      if (!this.currentUser) {
        this.router.navigate(['/']);
      }
    })
  }
}
