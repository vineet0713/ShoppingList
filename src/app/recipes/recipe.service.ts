import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';

import { Subject } from 'rxjs';

export class RecipeService {
	recipesChanged = new Subject<Recipe[]>();

	private recipes: Recipe[] = [
		new Recipe('Recipe 1',
			'Description 1',
			'https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2019/01/Hummus-Recipe-20.jpg',
			[new Ingredient('Spices', 100)]
		),
		new Recipe('Recipe 2',
			'Description 2',
			'https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2019/01/Hummus-Recipe-20.jpg',
			[new Ingredient('Chickpeas', 10), new Ingredient('Cream', 1)]
		)
	];

	// Returns a new array that is a copy of 'recipes'!
	getRecipes() { return this.recipes.slice(); }

	getRecipe(index: number) { return this.recipes[index]; }

	addRecipe(newRecipe: Recipe) {
		this.recipes.push(newRecipe);
		this.recipesChanged.next(this.recipes.slice());
	}
	updateRecipe(index: number, updatedRecipe: Recipe) {
		this.recipes[index] = updatedRecipe;
		this.recipesChanged.next(this.recipes.slice());
	}
	deleteRecipe(index: number) {
		this.recipes.splice(index, 1);
		this.recipesChanged.next(this.recipes.slice());
	}
}