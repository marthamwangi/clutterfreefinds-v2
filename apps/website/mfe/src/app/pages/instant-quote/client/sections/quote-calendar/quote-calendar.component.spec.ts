import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuoteCalendarComponent } from './quote-calendar.component';

describe('QuoteCalendarComponent', () => {
  let component: QuoteCalendarComponent;
  let fixture: ComponentFixture<QuoteCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuoteCalendarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuoteCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
