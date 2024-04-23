import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Book } from '../shared/book';
import { Router } from '@angular/router';
import { BookStoreService } from '../shared/book-store.service';

@Component({
  selector: 'app-book-create',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './book-create.component.html',
  styleUrl: './book-create.component.scss'
})
export class BookCreateComponent {

  private router = inject(Router);
  private bs = inject(BookStoreService);

  bookForm = new FormGroup({
    isbn: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(13),
        Validators.pattern(/^[0-9]*$/)
      ]
    }),
    title: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.maxLength(80)
      ]
    }),
    description: new FormControl('', {
      nonNullable: true,
      validators: []
    }),
    rating: new FormControl(1, {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.min(1),
        Validators.max(5),
      ]
    }),
    price: new FormControl(0, {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.min(0)
      ]
    })
  });

  submitForm() {


    // Werte aus dem Formular => Buch
    const newBook: Book = this.bookForm.getRawValue();

    this.bs.create(newBook).subscribe((receivedBook) => {
      this.router.navigate(['/books', receivedBook.isbn]);
      // this.router.navigateByUrl('/books');
    });



    // HTTP: Buch anlegen
    // bei Erfolg:
      // - navigieren, z. B. zum Dashboard oder Detailseite
      // - Reset
      // - Nachricht anzeigen
  }

  isInvalid(controlName: string): boolean {
    const control = this.bookForm.get(controlName);
    if (!control) {
      return false;
    }

    return control.invalid && control.touched;
  }

  // Alternative mit besserer Typisierung
  // "Bilde einen Union Type aller Schlüssel des Typen von bookForm.controls"
  isInvalidX(controlName: keyof typeof this.bookForm.controls): boolean {
    const control = this.bookForm.controls[controlName];
    return control.invalid && control.touched;
  }

  // AUFGABE: Diese Methode implementieren
  hasError(controlName: string, errorCode: string): boolean {
    const control = this.bookForm.get(controlName);
    if (!control) {
      return false;
    }

    return control.hasError(errorCode) && control.touched;
  }
}
