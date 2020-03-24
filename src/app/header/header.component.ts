import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { DataStorageService } from './../shared/data-storage.service';
import { AuthService } from './../auth/auth.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
	private userSubscription: Subscription;
	isAuthenticated = false;

	constructor(private dataStorageService: DataStorageService, private authService: AuthService) { }

	ngOnInit() {
		this.userSubscription = this.authService.currentUser.subscribe(newUser => {
			this.isAuthenticated = !!newUser;
		});
	}

	ngOnDestroy() {
		this.userSubscription.unsubscribe();
	}

	onSaveData() {
		this.dataStorageService.storeRecipes();
	}

	onFetchData() {
		this.dataStorageService.fetchRecipes().subscribe();
	}

	onLogout() {
		this.authService.logout();
	}
}