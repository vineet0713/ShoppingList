import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
	authForm: FormGroup;
	isLoginMode = true;
	isLoading = false;
	error: string = null;

	constructor(private authService: AuthService, private router: Router) { }
	ngOnInit() {
		this.authForm = new FormGroup({
			'email': new FormControl(null, [Validators.required, Validators.email]),
			'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
		});
	}

	onSwitchMode() { this.isLoginMode = !this.isLoginMode; }

	onSubmit() {
		if (this.authForm.invalid) { return; }
		this.isLoading = true;
		this.error = null;

		const email = this.authForm.get('email').value;
		const password = this.authForm.get('password').value;
		const successFunction = responseData => {
			this.isLoading = false;
			this.router.navigate(['/recipes']);
		};
		const errorFunction = errorMessage => {
			this.isLoading = false;
			this.error = errorMessage;
		};

		if (this.isLoginMode) {
			this.authService.login(email, password).subscribe(successFunction, errorFunction);
		} else {
			this.authService.signup(email, password).subscribe(successFunction, errorFunction);
		}
		this.authForm.reset();
	}

	onHandleError() {
		this.error = null;
	}
}
