import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Observable, Observer, Subscriber } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  // Dinge, die im Template genutzt werden sollen
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Book Rating!';

  constructor() {

    function producer(sub: Subscriber<number>) {
      const result = Math.random();
      sub.next(result);
      sub.next(10);
      sub.next(20);

      setTimeout(() => { sub.next(100); }, 2000)
      setTimeout(() => { sub.next(200); }, 4000)
      setTimeout(() => { sub.complete(); }, 6000)
    }

    const obs: Observer<number> = {
      next: (e: number) => console.log(e),
      error: (err: any) => console.error(err),
      complete: () => console.log('FERTIG'),
    };

    // producer(obs);

    const myObs$ = new Observable(producer);
    // myObs$.subscribe(obs);







  }
}
