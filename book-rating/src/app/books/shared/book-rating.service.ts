import { Injectable } from '@angular/core';
import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class BookRatingService {

  constructor() { }

  // Pure Function
  // - keine Seiteneffekte
  // - deterministisch: immer gleiche Ausgaben für gleiche Eingaben
  // - nur Eingabewerte verarbeiten
  rateUp(book: Book): Book {
    // Early Exit / Guard
    if (book.rating >= 5) {
      return book;
    }

    return {
      ...book,
      rating: book.rating + 1
    };
  }

  rateDown(book: Book): Book {
    return {
      ...book,
      rating: Math.max(1, book.rating - 1)
      // rating: book.rating > 1 ? book.rating - 1 : 1
    };
  }
}
