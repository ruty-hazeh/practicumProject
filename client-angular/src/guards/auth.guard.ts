import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const isLoggedIn = !!sessionStorage.getItem('token'); 

  if (!isLoggedIn) {
    alert('you need to login!!!!!!!!')
    router.navigate(['/']);  
    return false;
  }
  return true;
};
