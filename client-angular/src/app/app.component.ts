// import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
// import { RouterModule } from '@angular/router';
// import { RouterLink, RouterLinkActive } from '@angular/router';

// @Component({
//   selector: 'app-root',
//   imports: [RouterOutlet,RouterModule,RouterLink,RouterLinkActive],
//   templateUrl: './app.component.html',
//   styleUrl: './app.component.css'
// })
// export class AppComponent {
//   title = 'angular-project';
// }

// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
// import { SongListComponent } from '../components/song-list/song-list.component';
// import { UserListComponent } from '../components/user-list/user-list.component';
// import { AuthComponent } from '../components/auth/auth.component';
// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive,SongListComponent,UserListComponent,AuthComponent],
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent {
//   title = 'music-admin';
  
//   // משתנים לניהול המצב
//   isLoggedIn = false; // או true אם אתה רוצה להתחיל במצב מחובר
//   activeTab = 'songs'; // ברירת מחדל לטאב הראשון

//   // פונקציה לשינוי טאב
//   setActiveTab(tab: string) {
//     this.activeTab = tab;
//   }

//   // פונקציה להתחברות
//   onLoginSuccess() {
//     this.isLoggedIn = true;
//   }

//   // פונקציה להתנתקות (אופציונלי)
//   logout() {
//     this.isLoggedIn = false;
//     this.activeTab = 'songs'; // איפוס לטאב הראשון
//   }
// }


// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
// import { DashboardComponent } from '../components/dashboard/dashboard.component';
// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive,DashboardComponent],
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent {
//   title = 'music-admin';
// }


import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'music-admin';
  currentRoute = '';

  constructor(private router: Router) {
    // עקוב אחרי שינויי הניווט
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });
  }

  // בדוק אם זה דף הלוגין
  isLoginPage(): boolean {
    return this.currentRoute.includes('/auth/login');
  }

  // בדוק איזה דף פעיל
  isCurrentRoute(route: string): boolean {
    return this.currentRoute === route;
  }

  // ניווט לדף
  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  // התנתקות
  logout() {
    this.router.navigate(['/auth/login']);
  }
}