import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AlertService } from '../services/alert.service';
import { isPlatformBrowser } from '@angular/common';




export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);
  const alertService = inject(AlertService);
  
  
  let isLoggedIn = false;
  if (isPlatformBrowser(platformId)) {
    isLoggedIn = !!localStorage.getItem('token');
  }  
  if (!isLoggedIn) {
    alertService.show('you need to login!!!!!!!!')
    router.navigate(['/']);  
    return false;
  }
  return true;
};
