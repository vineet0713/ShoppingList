import { Component, OnInit } from '@angular/core';

import { Recipe } from '../recipe.model';

import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { RecipeService } from '../recipe.service';

import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
	recipe: Recipe;
	id: number;

	constructor(private shoppinglistService: ShoppingListService,
				private recipeService: RecipeService,
				private route: ActivatedRoute,
				private router: Router) { }

	ngOnInit() {
		this.route.params.subscribe((newParams: Params) => {
			this.id = +newParams.id;
			this.recipe = this.recipeService.getRecipe(this.id);
		});
	}

	onAddToShoppingList() {
		this.shoppinglistService.ingredientsAdded.next(this.recipe.ingredients);
	}

	onDeleteRecipe() {
		this.recipeService.deleteRecipe(this.id);
		this.router.navigate(['/recipes']);
	}
}
