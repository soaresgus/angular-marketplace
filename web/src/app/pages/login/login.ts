import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user';
import { Router } from '@angular/router';
import { UserAuthService } from '../../services/user-auth';
import { take } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  loginErrorMessage = ''
  userForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  private readonly _userService = inject(UserService)
  private readonly _userAuthService = inject(UserAuthService);
  private readonly _router = inject(Router);

  login() {
    if(this.userForm.invalid) return;

    const email = this.userForm.get('email')?.value as string;
    const password = this.userForm.get('password')?.value as string;

    this._userService.login(email, password).pipe(take(1)).subscribe({
      next: (response) => {
        this.loginErrorMessage = ''
        this._userAuthService.setUserToken(response.data.token)
        this._router.navigate(['/products']);
      },
      error: (error) => {
        console.error('Erro ao fazer login:', error);
        this.loginErrorMessage = error.error.message || 'Erro ao fazer login.'
      }
    })
  }
}
