import { Component, OnInit, OnDestroy } from '@angular/core';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
	recipes: Recipe[];
	recipeSubscription: Subscription;

	constructor(private recipeService: RecipeService,
				private router: Router) {	}

	ngOnInit() {
		this.recipes = this.recipeService.getRecipes();
		this.recipeSubscription = this.recipeService.recipesChanged.subscribe((newRecipes: Recipe[]) => {
			this.recipes = newRecipes;
		});
	}

	ngOnDestroy() {
		this.recipeSubscription.unsubscribe();
	}

	onNewRecipe() {
		this.router.navigate(['/recipes', 'new']);
	}
}
