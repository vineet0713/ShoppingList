import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
	editForm: FormGroup;
	editingSubscription: Subscription;
	editMode = false;
	editedItemIndex: number;
	editedItem: Ingredient;

	constructor(private shoppinglistService: ShoppingListService) { }

	ngOnInit() {
		this.editForm = new FormGroup({
			'name': new FormControl(null, Validators.required),
			'amount': new FormControl(null, Validators.required),
		});
		this.editingSubscription = this.shoppinglistService.startedEditing.subscribe((index: number) => {
			this.editMode = true;
			this.editedItemIndex = index;
			this.editedItem = this.shoppinglistService.getIngredient(index);
			this.editForm.setValue({
				'name': this.editedItem.name,
				'amount': this.editedItem.amount,
			});
		});
	}

	ngOnDestroy() {
		this.editingSubscription.unsubscribe();
	}

	onSubmit() {
		const ingredientName = this.editForm.get('name').value;
		const ingredientAmount = this.editForm.get('amount').value;
		const newIngredient = new Ingredient(ingredientName, ingredientAmount);
		if (this.editMode) {
			this.shoppinglistService.updateIngredient(this.editedItemIndex, newIngredient);
		} else {
			this.shoppinglistService.addIngredient(newIngredient);
		}
		this.onClear();
	}

	onDelete() {
		this.onClear();
		this.shoppinglistService.deleteIngredient(this.editedItemIndex);
	}

	onClear() {
		this.editMode = false;
		this.editForm.reset();		
	}
}
