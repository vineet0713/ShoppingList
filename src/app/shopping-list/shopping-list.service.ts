import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';

@Injectable()
export class ShoppingListService {
	private ingredients: Ingredient[] = [
		new Ingredient('Apples', 5),
		new Ingredient('Tomatoes', 10)
	];

	getIngredients() { return this.ingredients; }

	addIngredient(newIngredient: Ingredient) {
		this.ingredients.push(newIngredient);
	}

	ingredientsAdded = new Subject<Ingredient[]>();
}