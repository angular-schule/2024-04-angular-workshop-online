import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Book } from '../shared/book';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent {
  // hier fließen Daten hinein von der Elternkomponente
  // von oben nach unten
  @Input({ required: true }) book?: Book;
}
