import { Component, inject } from '@angular/core';
import { ReplaySubject, throwError, of, EMPTY, retry, catchError } from 'rxjs';

import { HistoryComponent } from '../../shared/history/history.component';
import { DataService } from './data.service';

@Component({
  templateUrl: './errorhandling.component.html',
  standalone: true,
  imports: [HistoryComponent]
})
export class ErrorhandlingComponent {

  logStream$ = new ReplaySubject<unknown>();
  private ds = inject(DataService);

  /**
   * Das Observable aus `this.ds.getData()` liefert Daten – oder mit hoher Wahrscheinlichkeit einen Fehler.
   * Probiere verschiedene Strategien aus, um den Fehler zu behandeln:
   * - wiederholen
   * - Fehler weiterwerfen
   * - Fehler umwandeln (in ein normales Element)
   * - Fehler verschlucken/ignorieren
   */

  start() {
    this.ds.getData().pipe(

      /******************************/

      
      /******************************/

    ).subscribe({
      next: e => this.logStream$.next(e),
      error: err => this.logStream$.next('❌ ERROR: ' + err)
    });
  }
}
