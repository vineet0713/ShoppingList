import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';

import { User } from './user.model';

interface AuthResponseData {
	kind: string;
	idToken: string;
	email: string;
	refreshToken: string;
	expiresIn: string;
	localId: string;
	registered?: string;	// this property only exists for login, not signup
}

@Injectable({
	// Same as including this service in 'providers' in AppModule!
	providedIn: 'root',
})
export class AuthService {
	apiKey = 'AIzaSyA8KL0bJnFZB0yOAT0rOi1NmKBPrb7zLJY';
	firebaseSignupURL = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${this.apiKey}`;
	firebaseLoginURL = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${this.apiKey}`;

	// 'BehaviorSubject' ALSO gives subscribers immediate access to the previously emitted value!
	currentUser = new BehaviorSubject<User>(null);

	private logoutTimer: any;

	constructor(private http: HttpClient, private router: Router) {}
	
	signup(email: string, password: string) {
		return this.commonAuth(email, password, this.firebaseSignupURL);
	}

	login(email: string, password: string) {
		return this.commonAuth(email, password, this.firebaseLoginURL);
	}

	private commonAuth(email: string, password: string, firebaseURL: string) {
		const authData = {
			email: email,
			password: password,
			returnSecureToken: true,
		};
		return this.http.post<AuthResponseData>(firebaseURL, authData)
		.pipe(
			catchError(responseError => {
				console.log(responseError);
				let errorMessage = 'An error occurred!';
				if (responseError.error && responseError.error.error) {
					switch (responseError.error.error.message) {
						case 'EMAIL_EXISTS':
							errorMessage = 'This email exists already!';
							break;
						case 'EMAIL_NOT_FOUND':
							errorMessage = 'This email was not found!';
							break;
						case 'INVALID_PASSWORD':
							errorMessage = 'The password you entered was invalid!';
							break;
					}
				}
				return throwError(errorMessage);
			}),
			tap(responseData => {
				const email = responseData.email;
				const id = responseData.localId;
				const token = responseData.idToken;
				const currentMilliseconds: number = (new Date()).getTime();
				const expirationMilliseconds = +responseData.expiresIn * 1000;
				const expirationDate = new Date(currentMilliseconds + expirationMilliseconds);
				const newUser = new User(email, id, token, expirationDate);
				this.currentUser.next(newUser);
				localStorage.setItem('userData', JSON.stringify(newUser));
				this.startAutoLogoutTimer(expirationMilliseconds);
			})
		);
	}

	autoLogin() {
		const userData = localStorage.getItem('userData');
		if (!userData) { return; }
		const userFromData: {
			email: string;
			id: string;
			_token: string;
			_tokenExpirationDate: string;
		} = JSON.parse(userData);
		const userTokenExpirationDate = new Date(userFromData._tokenExpirationDate);
		const loadedUser = new User(
			userFromData.email,
			userFromData.id,
			userFromData._token,
			userTokenExpirationDate
		);
		if (loadedUser.token) {
			this.currentUser.next(loadedUser);
			const currentMilliseconds: number = (new Date()).getTime();
			const expirationDateMilliseconds: number = userTokenExpirationDate.getTime();
			this.startAutoLogoutTimer(expirationDateMilliseconds - currentMilliseconds);
		}
	}

	logout() {
		this.currentUser.next(null);
		this.router.navigate(['/auth']);
		localStorage.removeItem('userData');
		if (this.logoutTimer) {
			clearTimeout(this.logoutTimer);
		}
		this.logoutTimer = null;
	}

	startAutoLogoutTimer(expirationDuration: number) {
		console.log(expirationDuration);
		this.logoutTimer = setTimeout(() => {
			this.logout();
		}, expirationDuration);
	}
}