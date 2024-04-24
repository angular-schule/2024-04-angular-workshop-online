import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BookStoreService } from '../shared/book-store.service';
import { Book } from '../shared/book';
import { Observable, filter, map, switchMap, tap, timer } from 'rxjs';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [RouterLink, AsyncPipe],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.scss'
})
export class BookDetailsComponent {
  private route = inject(ActivatedRoute);
  private bs = inject(BookStoreService);

  book$: Observable<Book>;

  bookk = toSignal(this.route.paramMap.pipe(
    map(params => params.get('isbn')!),
    switchMap(isbn => this.bs.getSingle(isbn))
  ));

  // interval = toSignal(timer(0, 1000).pipe(tap(e => console.log(e))));

  constructor() {
    // PULL
    // const isbn = this.route.snapshot.paramMap.get('isbn'); // path: 'books/:isbn'
    // console.log(isbn);

    // PUSH
    this.book$ = this.route.paramMap.pipe(
      map(params => params.get('isbn')),
      filter((isbn): isbn is string => !!isbn),
      switchMap(isbn => this.bs.getSingle(isbn)),
    );

  }
}
