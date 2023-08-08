import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/core/services/api/api.service';
import { User } from 'src/core/models/user.model';
import { FallowedUserRequest } from 'src/core/models/request/fallowed-user-request.model';
import { AuthService } from 'src/core/services/auth/auth.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss'],
  providers: [MessageService],

})
export class AllUsersComponent implements OnInit {

  constructor(
    private apiService: ApiService,
    public authService: AuthService,
    private messageService: MessageService,
    private router:Router
  ) { }

  users: User[] = [];

  fallowedUserRequest: FallowedUserRequest = <FallowedUserRequest>{};

  currentUser: User | null = null;

  fallowedUser: User | undefined;

  refresh() {
    this.apiService.getAllEntities(User).subscribe(response => {
      this.users = response.data;
    })
  }

  fallow(id: number, entity: FallowedUserRequest) {
    this.fallowedUserRequest.user_id = this.currentUser?.id || 0;
    this.apiService.getEntityById<User>(id, User).then(user => {
      this.fallowedUser = user?.data;
      this.fallowedUserRequest.fallowed_user_id = this.fallowedUser?.id || 0;
      this.createEntity<FallowedUserRequest>(entity, 'FallowedUser').then(response => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Kullanıcı takip ediliyor' });
      })
    })
  }

  createEntity<TEntity>(entity: TEntity, entityType: string) {
    return this.apiService.createEntity<TEntity>(entity, entityType);
  }

  ngOnInit() {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
      if (!this.currentUser) {
        this.router.navigate(['/']);
      }
    })
    this.refresh();
  }
}
