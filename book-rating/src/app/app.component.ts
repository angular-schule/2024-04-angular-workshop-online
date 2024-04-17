import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardComponent } from './books/dashboard/dashboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  // Dinge, die im Template genutzt werden sollen
  imports: [RouterOutlet, DashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Book Rating!';
}
