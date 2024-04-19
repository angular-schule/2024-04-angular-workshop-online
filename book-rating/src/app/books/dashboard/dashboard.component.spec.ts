import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { Book } from '../shared/book';
import { BookRatingService } from '../shared/book-rating.service';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    const ratingMock = {
      rateUp: (b: Book) => b,
      rateDown: (b: Book) => b
    };

    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [
        // Abhängigkeit ersetzen:
        // immer wenn BRS angefordert wird, wird stattdessen ratingMock ausgeliefert
        { provide: BookRatingService, useValue: ratingMock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    // TS-Klasseninstanz
    component = fixture.componentInstance;

    // DOM-Element
    // fixture.nativeElement

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call service.rateUp for doRateUp()', () => {
    // Service anfordern: das ist aber eigentlich unser ratingMock
    const service = TestBed.inject(BookRatingService);

    // Buch
    const testBook = { isbn: '123' } as Book; // Type Assertion – gefährlich, bitte nur in Ausnahmefällen und im Test verwenden


    // Methode überwachen
    // spyOn(service, 'rateUp').and.returnValue(testBook);
    // spyOn(service, 'rateUp').and.callFake(b => b);
    // durchleiten zum "Original": Methode wird nicht weggeworfen,
    // sondern im Hintergrund trotzdem aufgerufen
    spyOn(service, 'rateUp').and.callThrough();


    // Act: Methode in Komponente aufrufen
    component.doRateUp(testBook);


    // prüfen, ob Servicemethode aufgerufen wurde
    expect(service.rateUp).toHaveBeenCalled();
    expect(service.rateUp).toHaveBeenCalledOnceWith(testBook);

  });
});
