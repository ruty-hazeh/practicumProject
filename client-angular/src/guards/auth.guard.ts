import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AlertService } from '../services/alert.service';




export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isLoggedIn = !!localStorage.getItem('token'); 
  const alertService = inject(AlertService);

  
  if (!isLoggedIn) {
    alertService.show('you need to login!!!!!!!!')
    router.navigate(['/']);  
    return false;
  }
  return true;
};
