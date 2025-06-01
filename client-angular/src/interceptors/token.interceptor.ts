// import { HttpInterceptorFn } from '@angular/common/http';

// export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  
//   const token = sessionStorage.getItem('token');

//     if (token) {
//       const clonedRequest = req.clone({
//         setHeaders: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//       return next(clonedRequest);
//     }

//     return next(req); 
// };

import { HttpInterceptorFn } from '@angular/common/http';
import { throwError } from 'rxjs';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  // const token = sessionStorage.getItem('token');
  const token = (typeof window !== 'undefined' && localStorage.getItem('token')) || '';

  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      // const isAdmin = payload.role === 'admin';

      const role = payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || payload.role;
      const isAdmin = role === 'Admin';
      
      if (!isAdmin) {
        return throwError(() => new Error('Unauthorized: User is not an admin'));
      }

      const clonedRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });

      return next(clonedRequest);
    } catch {
      return throwError(() => new Error('Invalid token'));
    }
  }

  return next(req);
};
