// import { Component, OnInit } from '@angular/core';
// import { UserService } from '../../services/user.service';
// import { User } from '../../models/user';
// import { UserFormComponent } from '../user-form/user-form.component';
// import { CommonModule } from '@angular/common';
// @Component({
//     standalone: true,
//     imports: [UserFormComponent,CommonModule],
//   selector: 'app-user-list',
//   templateUrl: './user-list.component.html',
// })
// export class UserListComponent implements OnInit {
//   users: User[] = [];

//   constructor(private userService: UserService) {}

//   ngOnInit(): void {
//     this.loadUsers();
//   }

//   loadUsers() {
//     this.userService.getAll().subscribe(data => this.users = data);
//   }

//   deleteUser(id: number) {
//     this.userService.delete(id).subscribe(() => this.loadUsers());
//   }
// }

import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { UserFormComponent } from '../user-form/user-form.component';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [UserFormComponent, CommonModule],
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'] // הוסף את זה אם יש לך קובץ CSS
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
    // הוסף אישור מחיקה
    const user = this.users.find(u => u.id === id);
    if (user && confirm(`האם אתה בטוח שברצונך למחוק את המשתמש "${user.name}"?`)) {
      this.userService.delete(id).subscribe(() => this.loadUsers());
    }
  }

  // הפונקציה החסרה - יוצרת ראשי תיבות מהשם
  getInitials(name: string): string {
    if (!name) return '';
    
    return name
      .split(' ')
      .map(n => n.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2); // מגביל ל-2 תווים מקסימום
  }
}