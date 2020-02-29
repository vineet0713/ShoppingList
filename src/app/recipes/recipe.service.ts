import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';

export class RecipeService {
	private recipes: Recipe[] = [
		new Recipe('Recipe 1',
			'Description 1',
			'https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2019/01/Hummus-Recipe-20.jpg',
			[new Ingredient('Spices', 100)]
		),
		new Recipe('Recipe 2',
			'Description 2',
			'https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2019/01/Hummus-Recipe-20.jpg',
			[new Ingredient('Chickpeas', 10)]
		)
	];

	// Returns a new array that is a copy of 'recipes'!
	getRecipes() { return this.recipes.slice(); }

	getRecipe(index: number) { return this.recipes[index]; }
}