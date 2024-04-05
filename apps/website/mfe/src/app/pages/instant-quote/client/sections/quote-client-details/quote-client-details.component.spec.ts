import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuoteClientDetailsComponent } from './quote-client-details.component';

describe('QuoteClientDetailsComponent', () => {
  let component: QuoteClientDetailsComponent;
  let fixture: ComponentFixture<QuoteClientDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuoteClientDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuoteClientDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
