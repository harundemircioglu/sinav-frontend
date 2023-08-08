import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/core/services/auth/auth.service';
import { User } from 'src/core/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  currentUser: User | null = null;

  constructor(
    private authService: AuthService,
    public router: Router
  ) { }

  items: MenuItem[] | undefined;

  ngOnInit() {

    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
      if (this.currentUser?.userType === 0 || this.currentUser == null) {
        this.router.navigate(['/']);
      }
    });

    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-fw pi-home',
        routerLink: '/dashboard',
      }, {
        label: 'Users',
        icon: 'pi pi-fw pi-user',
        routerLink: '/dashboard/users',
      },
      {
        label: 'Quit',
        icon: 'pi pi-fw pi-power-off',
        command: () => this.logout(),
      }
    ];
  }

  logout() {
    this.authService.logOut();
  }
}
