import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuoteAdditonalInfoComponent } from './quote-additonal-info.component';

describe('QuoteAdditonalInfoComponent', () => {
  let component: QuoteAdditonalInfoComponent;
  let fixture: ComponentFixture<QuoteAdditonalInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuoteAdditonalInfoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuoteAdditonalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
