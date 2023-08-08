import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/core/services/api/api.service';
import { AuthService } from 'src/core/services/auth/auth.service';
import { User } from 'src/core/models/user.model';
import { ResponseStatus } from 'src/core/models/response/base-response.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  currentUser: User | null = null;

  constructor(
    private apiService: ApiService,
    public authService: AuthService
  ) { }
  ngOnInit() {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
    })
  }
}
