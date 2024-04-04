import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuoteProductComponent } from './quote-product.component';

describe('QuoteProductComponent', () => {
  let component: QuoteProductComponent;
  let fixture: ComponentFixture<QuoteProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuoteProductComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuoteProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
