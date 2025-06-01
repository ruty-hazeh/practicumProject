// import { Component, OnInit } from '@angular/core';
// import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { AuthService } from '../../services/auth.service';
// import { ActivatedRoute, Router } from '@angular/router';
// import { User } from '../../models/user';
// import { ReactiveFormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-auth',
//   standalone: true,
//   imports: [ReactiveFormsModule, CommonModule],
//   templateUrl: './auth.component.html',
//   styleUrls: ['./auth.component.css']
// })
// export class AuthComponent implements OnInit {
//   public isLogin = false;

//   SignInForm = new FormGroup({
//     name: new FormControl<string | null>(null, [Validators.required]),
//     email: new FormControl<string | null>(null, [Validators.email]),
//     password: new FormControl<string | null>(null, [Validators.required, Validators.minLength(6)])
//   });

//   constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) {}

//   ngOnInit(): void {
//     const routeParam = this.route.snapshot.paramMap.get('type');
//     this.isLogin = routeParam === 'login';

//     if (this.isLogin) {
//       this.SignInForm.get('name')?.clearValidators();
//     } else {
//       this.SignInForm.get('name')?.setValidators(Validators.required);
//     }

//     this.SignInForm.get('name')?.updateValueAndValidity();
//   }

//   Submit() {
//     if (this.SignInForm.valid) {
//       const { name, email, password } = this.SignInForm.value as {
//         name: string;
//         email: string;
//         password: string;
//       };

//       if (this.isLogin) {
//         this.authService.login({ name, password }).subscribe({
//           next: (res) => {
//             alert('Login successful!');
//             this.router.navigate(['/home']);
//           },
//           error: (err) => {
//             alert('Login failed: ' + (err.error?.message || 'Unknown error'));
//           }
//         });
//       } else {
//         const newUser = new User(0, name, email, password);
//         this.authService.register(newUser).subscribe({
//           next: (res) => {
//             alert('Registration successful!');
//             this.router.navigate(['/home']);
//           },
//           error: (err) => {
//             alert('Registration failed: ' + (err.error?.message || 'Unknown error'));
//           }
//         });
//       }
//     }
//   }
// }


import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  SignInForm = new FormGroup({
    name: new FormControl<string | null>(null, [Validators.required]),
    password: new FormControl<string | null>(null, [Validators.required, Validators.minLength(6)])
  });

  constructor(private authService: AuthService, private router: Router,private alertService: AlertService) {}
  ngOnInit(): void {}

  Submit() {
    if (this.SignInForm.valid) {
      const { name, password } = this.SignInForm.value as { name: string; password: string };

      this.authService.login({ name, password }).subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
        
        },
        error: (err) => {
          this.alertService.show('Login failed: ' + (err.error?.message || 'Unknown error'));
        }
      });
    }
  }
}
