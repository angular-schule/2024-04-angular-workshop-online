import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [],
  styles: [],
  template: `
  <span class="badge bg-secondary">
    @for(_ of numToArray(value); track $index) {⭐️}
  </span>`,
})
export class RatingComponent {
  @Input() value = 0;

  numToArray(value: number) {
    return new Array(Math.max(0, value));
  }
}
