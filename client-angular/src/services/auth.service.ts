import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://server-dotnet.onrender.com/api/Auth';

  constructor(private http: HttpClient, private platformId: Object) {}
  login(credentials: { name: string, password: string }): Observable<any> {
    return this.http.post<{ token: string }>(`${this.baseUrl}/login`, credentials)
      .pipe(
        tap(response => {
          if (response.token && isPlatformBrowser(this.platformId)) {
            localStorage.setItem('token', response.token);
            const payload = this.decodeToken(response.token);
            // const role = payload?.role || 'User';
            const role =
            payload?.['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] ||
            payload?.role || 'User';
            console.log(role)
            console.log(response.token)
            if (role !== 'Admin' && isPlatformBrowser(this.platformId)) {
              // לא מנהל – נזרוק שגיאה ונמחק את הטוקן
              localStorage.clear();
              throw new Error('גישה מותרת למנהלים בלבד');
            }
  if( isPlatformBrowser(this.platformId)){
            // שמירת פרטים אם עבר את הבדיקה
            localStorage.setItem('role', role);
  }
            // sessionStorage.setItem('name', payload?.unique_name || '');
          }
        })
      );
  }
  

  register(user: { name: string, email: string, password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user);
  }

  get isAdmin(): boolean {
    return localStorage.getItem('role') === 'Admin';
  }

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch {
      return null;
    }
  }

  logout(): void {
    localStorage.clear();
  }
}
