import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
	id: number;
	editMode = false;
	recipeForm: FormGroup;

	constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) { }

	ngOnInit() {
		this.route.params.subscribe((newParams: Params) => {
			this.id = +newParams.id;
			this.editMode = ('id' in newParams);
			this.initForm();
		});
	}

	private initForm() {
		let recipeName = null, recipeDescription = null, recipeImagePath;
		let recipeIngredients = new FormArray([]);
		if (this.editMode) {
			const currentRecipe = this.recipeService.getRecipe(this.id);
			recipeName = currentRecipe.name;
			recipeDescription = currentRecipe.description;
			recipeImagePath = currentRecipe.imagePath;
			if (currentRecipe.ingredients) {
				for (let ingredient of currentRecipe.ingredients) {
					recipeIngredients.push(new FormGroup({
						'name': new FormControl(ingredient.name, Validators.required),
						'amount': new FormControl(ingredient.amount, Validators.required),
					}));
				}
			}
		}
		
		this.recipeForm = new FormGroup({
			'name': new FormControl(recipeName, Validators.required),
			'description': new FormControl(recipeDescription, Validators.required),
			'imagePath': new FormControl(recipeImagePath, Validators.required),
			'ingredients': recipeIngredients,
		});
	}

	onSubmit() {
		const newRecipe = new Recipe(
			this.recipeForm.value['name'],
			this.recipeForm.value['description'],
			this.recipeForm.value['imagePath'],
			this.recipeForm.value['ingredients'],
		);
		if (this.editMode) {
			this.recipeService.updateRecipe(this.id, newRecipe);
		} else {
			this.recipeService.addRecipe(newRecipe);
		}
		this.router.navigate(['../'], { relativeTo: this.route });
	}

	onCancel() {
		this.router.navigate(['../'], { relativeTo: this.route });
	}

	getControls() {
		return (<FormArray>this.recipeForm.get('ingredients')).controls;
	}

	onAddIngredient() {
		const newGroup = new FormGroup({
			'name': new FormControl(null, Validators.required),
			'amount': new FormControl(null, Validators.required),
		});
		(<FormArray>this.recipeForm.get('ingredients')).push(newGroup);
	}

	onDeleteIngredient(index: number) {
		(<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
	}

}
