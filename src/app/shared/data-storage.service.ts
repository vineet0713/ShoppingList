import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map, tap, take, exhaustMap } from 'rxjs/operators';

import { Recipe } from './../recipes/recipe.model';
import { RecipeService } from './../recipes/recipe.service';
import { AuthService } from './../auth/auth.service';

@Injectable({
	// Same as including this service in 'providers' in AppModule!
	providedIn: 'root',
})
export class DataStorageService {
	private firebaseURL = 'https://serverforangular.firebaseio.com/recipes.json';

	constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) {}

	storeRecipes() {
		const recipes = this.recipeService.getRecipes();
		this.http.put(this.firebaseURL, recipes).subscribe(response => {
			console.log(response);
		});
	}

	fetchRecipes() {
		return this.http.get<Recipe[]>(this.firebaseURL).pipe(
			map(recipes => {
				// If a retrieved recipe does NOT have ingredients, then add that property to the recipe object!
				return recipes.map(recipe => {
					return { ...recipe, ingredients: (recipe.ingredients ? recipe.ingredients : []) };
				});
			}),
			tap(recipes => {
				this.recipeService.setRecipes(recipes);
			})
		);
	}
}