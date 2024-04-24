import { Component, EventEmitter, Input, Output, output } from '@angular/core';
import { Book } from '../shared/book';
import { RatingComponent } from '../rating/rating.component';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [RatingComponent, CurrencyPipe, RouterLink],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss',
})
export class BookComponent {
  // hier fließen Daten hinein von der Elternkomponente
  // von oben nach unten
  @Input({ required: true }) book?: Book;

  @Input() minRating = 0;
  @Input() maxRating = 10;

  @Input() hideRatingControls = false;

  // hier können Daten zur Elternkomponente fließen
  // von unten nach oben
  @Output() rateUp = new EventEmitter<Book>();
  @Output() rateDown = new EventEmitter<Book>();
  @Output() delete = new EventEmitter<Book>();
  // rateUp = output<Book>();
  // @Output() rate = new EventEmitter<{ diff: number, book: Book }>();

  doRateUp() {
    this.rateUp.emit(this.book);
  }

  doRateDown() {
    this.rateDown.emit(this.book);
  }

  doDelete() {
    if (confirm('Buch löschen?')) {
      this.delete.emit(this.book);
    }
  }
}
