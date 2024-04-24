import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, filter, of, switchMap } from 'rxjs';
import { BookStoreService } from '../shared/book-store.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-book-search',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './book-search.component.html',
  styleUrl: './book-search.component.scss'
})
export class BookSearchComponent {
  searchControl = new FormControl('', { nonNullable: true });

  private bs = inject(BookStoreService);

  searchResult$ = this.searchControl.valueChanges.pipe(
    // filter(term => term.length >= 3),
    debounceTime(200),
    switchMap(term => {
      if (term.length >= 3) {
        return this.bs.search(term)
      } else {
        return of([]);
      }
    }),
    // switchMap(term => term.length >= 3 ? this.bs.search(term) : of([]))
  );
}
