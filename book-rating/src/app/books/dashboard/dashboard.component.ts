import { Component, inject } from '@angular/core';
import { Book } from '../shared/book';
import { BookComponent } from '../book/book.component';
import { BookRatingService } from '../shared/book-rating.service';
import { BookStoreService } from '../shared/book-store.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { BookActions } from '../store/book.actions';
import { map } from 'rxjs';
import { selectBooks } from '../store/book.selectors';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [BookComponent, DatePipe],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  books: Book[] = [];

  d = Date.now();
  interval = setInterval(() => this.d = Date.now(), 1000);

  // private rs = inject(BookRatingService);

  constructor(private rs: BookRatingService, private bs: BookStoreService, private store: Store) {
    /*this.bs.getAll().subscribe(books => {
      this.books = books;
    });*/

    this.store.select(selectBooks).subscribe(books => {
      this.books = books;
    });

    // const books = this.store.selectSignal(selectBooks);

    this.store.dispatch(BookActions.loadBooks());
  }

  doRateUp(book: Book) {
    const ratedBook = this.rs.rateUp(book);
    this.updateList(ratedBook);
  }

  doRateDown(book: Book) {
    const ratedBook = this.rs.rateDown(book);
    this.updateList(ratedBook);
  }

  doDelete(book: Book) {
    this.bs.delete(book.isbn).subscribe(() => {
      // Buchliste neu laden
      this.bs.getAll().subscribe(books => {
        this.books = books;
      });

      // ODER: Buch lokal entfernen
      // this.books = this.books.filter(b => b.isbn !== book.isbn);
    })
  }

  private updateList(ratedBook: Book) {
    // [1,2,3,4,5].map(e => e * 10) // [10, 20, 30, 40, 50]
    // [1,2,3,4,5,6].filter(e => e > 3) // [4, 5, 6]

    this.books = this.books.map(b => {
      if (b.isbn === ratedBook.isbn) {
        return ratedBook;
      } else {
        return b;
      }
    });

  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }
}
