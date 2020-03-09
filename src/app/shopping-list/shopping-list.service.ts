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

	getIngredient(index: number) { return this.ingredients[index]; }

	addIngredient(newIngredient: Ingredient) {
		this.ingredients.push(newIngredient);
	}

	updateIngredient(index: number, updatedIngredient: Ingredient) {
		this.ingredients[index] = updatedIngredient;
	}

	deleteIngredient(index: number) {
		this.ingredients.splice(index, 1);
	}

	ingredientsAdded = new Subject<Ingredient[]>();
	startedEditing = new Subject<number>();
}