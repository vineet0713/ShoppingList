import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Recipe } from '../recipe.model';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
	@Output() recipeWasSelected = new EventEmitter<Recipe>();

	recipes: Recipe[] = [
		new Recipe('Recipe 1', 'Description 1', 'https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2019/01/Hummus-Recipe-20.jpg'),
		new Recipe('Recipe 2', 'Description 2', 'https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2019/01/Hummus-Recipe-20.jpg')
	];

	constructor() { }

	ngOnInit() { }

	onRecipeSelected(recipe: Recipe) {
		this.recipeWasSelected.emit(recipe);
	}
}
