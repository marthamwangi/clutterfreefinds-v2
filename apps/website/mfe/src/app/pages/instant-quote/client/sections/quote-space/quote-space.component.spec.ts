import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuoteSpaceComponent } from './quote-space.component';

describe('QuoteSpaceComponent', () => {
  let component: QuoteSpaceComponent;
  let fixture: ComponentFixture<QuoteSpaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuoteSpaceComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuoteSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
