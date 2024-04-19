import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.scss'
})
export class BookDetailsComponent {
  private route = inject(ActivatedRoute);

  constructor() {
    // PULL
    // const isbn = this.route.snapshot.paramMap.get('isbn'); // path: 'books/:isbn'
    // console.log(isbn);

    // PUSH
    this.route.paramMap.subscribe(params => {
      const isbn = params.get('isbn');
      console.log(isbn);
    });
  }
}
