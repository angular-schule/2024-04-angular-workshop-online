import { Routes } from '@angular/router';
import { booksRoutes } from './books/books.routes';

export const routes: Routes = [
  // bei Weiterleitung vom leeren Pfad (fast) immer pathMatchFull notwendig
  { path: '', redirectTo: '/books', pathMatch: 'full' },
  ...booksRoutes,

  // { path: '**', component: ... }
];
