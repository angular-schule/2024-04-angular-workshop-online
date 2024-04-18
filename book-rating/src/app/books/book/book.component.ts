import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Book } from '../shared/book';
import { RatingComponent } from '../rating/rating.component';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [RatingComponent],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss',
})
export class BookComponent {
  // hier fließen Daten hinein von der Elternkomponente
  // von oben nach unten
  @Input({ required: true }) book?: Book;

  @Output() rateUp = new EventEmitter<Book>();
  @Output() rateDown = new EventEmitter<Book>();

  doRateUp() {
    this.rateUp.emit(this.book);
  }

  doRateDown() {
    this.rateDown.emit(this.book);
  }
}
