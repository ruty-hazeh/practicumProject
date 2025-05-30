import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private router: Router) {}

  navigateToSongs() {
    this.router.navigate(['/songs']);
  }

  navigateToUsers() {
    this.router.navigate(['/users']);
  }
  navigateToSingers(){
    this.router.navigate(['/singers']);
  }
  logout() {
    this.router.navigate(['/auth/login']);
  }
}