import { Routes } from '@angular/router';
import { SongListComponent } from '../components/song-list/song-list.component';
import { SongFormComponent } from '../components/song-form/song-form.component';
import { AuthComponent } from '../components/auth/auth.component';
import { EnteranceComponent } from '../components/enterance/enterance.component';
import { UserListComponent } from '../components/user-list/user-list.component';
import { UserFormComponent } from '../components/user-form/user-form.component';
import { authGuard } from '../guards/auth.guard';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { SingerComponent } from '../components/singer/singer.component';



export const routes: Routes = [
  { path: 'auth/login', component: AuthComponent },
  { path: 'songs', component: SongListComponent, canActivate: [authGuard] },
  { path: 'songs/new', component: SongFormComponent, canActivate: [authGuard] },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'users', component: UserListComponent, canActivate: [authGuard] },
  { path: 'singers', component: SingerComponent, canActivate: [authGuard] },
  { path: 'users/new', component: UserFormComponent, canActivate: [authGuard] },
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: '**', redirectTo: 'auth/login' }
  // { path: 'auth/login', component: AuthComponent },
  // { path: 'songs', component: SongListComponent },
  // { path: 'songs/new', component: SongFormComponent },
  // { path: 'dashboard', component: DashboardComponent },
  // { path: 'users', component: UserListComponent },
  // { path: 'singers', component: SingerComponent },
  // { path: 'users/new', component: UserFormComponent },
  // { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  // { path: '**', redirectTo: 'auth/login' }
];
