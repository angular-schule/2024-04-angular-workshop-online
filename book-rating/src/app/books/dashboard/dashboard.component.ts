import { Component } from '@angular/core';
import { Book } from '../shared/book';
import { BookComponent } from '../book/book.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [BookComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  books: Book[] = [];

  constructor() {
    this.books = [
      {
        isbn: '123',
        title: 'Angular',
        description: 'Grundlagen und mehr',
        price: 42.9,
        rating: 5,
      },
      {
        isbn: '456',
        title: 'Vue.js',
        description: 'Das grüne Framework',
        price: 32.9,
        rating: 3,
      }
    ];
  }
}
