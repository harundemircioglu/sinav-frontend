import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/core/services/api/api.service';
import { User } from 'src/core/models/user.model';
import { ResponseStatus } from 'src/core/models/response/base-response.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [MessageService]
})
export class UserComponent implements OnInit {

  constructor(
    private apiService: ApiService,
    public messageService: MessageService
  ) { }

  users: User[] = [];

  selectedUser: User | undefined;

  selectUser(id: number) {
    this.apiService.getEntityById<User>(id, User).then(response => {
      this.selectedUser = response?.data;
    })
  }

  onUpdate(id: number, updatedUser: User) {
    this.update(id, updatedUser).then(response => {
      if (response?.status == ResponseStatus.Ok) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Güncelleme işlemi başarılı' });
        this.selectedUser = undefined;
        this.resfresh();
      }
    })
  }

  update(id: number, updatedUser: User) {
    return this.apiService.updateEntity(id, updatedUser, User);
  }

  onDelete(id: number) {
    this.delete(id).then(response => {
      if (response?.status == ResponseStatus.Ok) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Silme işlemi başarılı' });
        this.resfresh();
      }
    })
  }

  delete(id: number) {
    return this.apiService.deleteEntity(id, User);
  }

  close() {
    this.selectedUser = undefined;
  }

  resfresh() {
    this.apiService.getAllEntities(User).subscribe(response => {
      this.users = response.data;
    })
  }

  ngOnInit() {
    this.resfresh();
  }
}
