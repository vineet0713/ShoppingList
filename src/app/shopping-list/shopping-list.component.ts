import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';

import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
	ingredients: Ingredient[];
	private ingredientsAddedSubscription: Subscription;

	constructor(private shoppinglistService: ShoppingListService) { }

	ngOnInit() {
		this.ingredients = this.shoppinglistService.getIngredients();
		this.ingredientsAddedSubscription = this.shoppinglistService.ingredientsAdded.subscribe((newIngredients: Ingredient[]) => {
			this.ingredients.push(...newIngredients);
		});
	}

	onEditItem(itemId: number) {
		this.shoppinglistService.startedEditing.next(itemId);
	}
}
