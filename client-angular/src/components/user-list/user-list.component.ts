import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { UserFormComponent } from '../user-form/user-form.component';
import { CommonModule } from '@angular/common';
@Component({
    standalone: true,
    imports: [UserFormComponent,CommonModule],
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAll().subscribe(data => this.users = data);
  }

  deleteUser(id: number) {
    this.userService.delete(id).subscribe(() => this.loadUsers());
  }
}
