import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-create',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './book-create.component.html',
  styleUrl: './book-create.component.scss'
})
export class BookCreateComponent {
  bookForm = new FormGroup({
    isbn: new FormControl('', {
      nonNullable: true,
      validators: []
    }),
    title: new FormControl('', {
      nonNullable: true,
      validators: []
    }),
    description: new FormControl('', {
      nonNullable: true,
      validators: []
    }),
    rating: new FormControl(1, {
      nonNullable: true,
      validators: []
    }),
    price: new FormControl(0, {
      nonNullable: true,
      validators: []
    }),
    address: new FormGroup({
      city: new FormControl('', { nonNullable: true }),
      plz: new FormControl('', { nonNullable: true }),
    }),
    authors: new FormArray([
      new FormControl('', { nonNullable: true }),
      new FormControl('', { nonNullable: true }),
      new FormControl('', { nonNullable: true }),
    ])
  });
}
