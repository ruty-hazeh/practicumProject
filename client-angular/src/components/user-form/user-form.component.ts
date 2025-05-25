import { Component, EventEmitter, Output } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [FormsModule],
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
})
export class UserFormComponent {
  name = '';
  email = '';
  password = '';
  @Output() refresh = new EventEmitter<void>();

  constructor(private userService: UserService) {}

  submit() {
    const user = { name: this.name, email: this.email, password: this.password };
    // this.userService.add(user).subscribe(() => this.refresh.emit());
    this.userService.add(user).subscribe({
      next: () => this.refresh.emit(),
      error: err => console.error('Error adding user', err)
    });
  }
}
