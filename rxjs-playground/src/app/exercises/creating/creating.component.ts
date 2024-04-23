import { Component } from '@angular/core';
import { Observable, of, from, timer, interval, ReplaySubject, map, filter, Observer, Subscriber } from 'rxjs';
import { HistoryComponent } from '../../shared/history/history.component';

@Component({
  templateUrl: './creating.component.html',
  standalone: true,
  imports: [HistoryComponent]
})
export class CreatingComponent {

  logStream$ = new ReplaySubject<unknown>();

  constructor() {
    /**
     * 1. Erstelle ein Observable und abonniere den Datenstrom.
     *    Probiere dazu die verschiedenen Creation Functions aus: of(), from(), timer(), interval()
     * 2. Implementiere außerdem ein Observable manuell, indem du den Konstruktor "new Observable()" nutzt.
     *
     * Tipps:
     * Zum Abonnieren kannst du einen (partiellen) Observer oder ein einzelnes next-Callback verwenden.
     * Du kannst die Methode this.log() verwenden, um eine Ausgabe in der schwarzen Box im Browser zu erzeugen.
     */

    /******************************/

    // of('Leipzig', 'Stuttgart', 'Köln')
    // from([1,2,3,4,5,6])
    // interval(1000)           // ---0---1---2---3---4---5 ...
    // timer(3000)              // ---------0|
    // timer(3000, 1000)        // ---------0---1---2---3---4---5 ...
    // timer(1000, 1000)        // ---0---1---2---3---4---5 ...
    // timer(0, 1000)           // 0---1---2---3---4---5 ...

    timer(0, 1000).pipe(
      map(e => e * 3),
      filter(e => e % 2 === 0),
    ).subscribe({
      next: e => this.log(e),
      complete: () => this.log('COMPLETE')
    });


    /******************************/

    function producer(sub: Subscriber<number>) {
      const result = Math.random();
      sub.next(result);
      sub.next(10);
      sub.next(20);

      const timer1 = setTimeout(() => { sub.next(100); }, 2000)
      const timer2 = setTimeout(() => {
        sub.next(200);
        console.log('INNEN', 200);
      }, 4000)
      const timer3 = setTimeout(() => { sub.complete(); }, 6000)

      // Teardown Logic
      return () => {
        clearInterval(timer1);
        clearInterval(timer2);
        clearInterval(timer3);
      };
    }

    const obs: Observer<number> = {
      next: (e: number) => console.log(e),
      error: (err: any) => console.error(err),
      complete: () => console.log('FERTIG'),
    };

    // producer(obs);

    const myObs$ = new Observable(producer);
    /*const subscription = myObs$.subscribe(obs);

    setTimeout(() => {
      console.log('UNSUBSCRIBE')
      subscription.unsubscribe()
    }, 3000);*/


    /******************************/
  }

  private log(msg: unknown) {
    this.logStream$.next(msg);
  }

}
