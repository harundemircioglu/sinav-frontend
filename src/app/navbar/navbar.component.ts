import { Component } from '@angular/core';
import { AuthService } from 'src/core/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(
    private authService: AuthService
  ) { }

  logout() {
    this.authService.logOut();
  }
}
