import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
	selector: '[appDropdown]'
})
export class DropdownDirective {
	@HostBinding('class.open') isOpen = false;

	@HostListener('click') toggleOpenMenu(event: Event) {
		this.isOpen = !this.isOpen;
	}
}