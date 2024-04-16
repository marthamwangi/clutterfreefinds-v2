import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuotePaymentOptionsComponent } from './quote-payment-options.component';

describe('QuotePaymentOptionsComponent', () => {
  let component: QuotePaymentOptionsComponent;
  let fixture: ComponentFixture<QuotePaymentOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuotePaymentOptionsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuotePaymentOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
