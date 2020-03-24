import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from '@angular/common/http';

import { take, exhaustMap} from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
	constructor(private authService: AuthService) {}
	
	intercept(request: HttpRequest<any>, next: HttpHandler) {
		return this.authService.currentUser.pipe(
			// This only takes 1 value from the observable, and then immediately unsubscribes
			take(1),
			// This takes the data from the previous observable (aka 'user'), returns a NEW observable which is the new observable in the chain!
			exhaustMap(user => {
				if (!user) {
					// This will be true for the signup/login requests (since there is no User at that point!)
					return next.handle(request);
				}
				const modifiedRequest = request.clone({
					params: (new HttpParams()).set('auth', user.token)
				});
				return next.handle(modifiedRequest);
			})
		);
	}
}