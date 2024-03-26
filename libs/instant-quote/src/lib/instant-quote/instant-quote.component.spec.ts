import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InstantQuoteComponent } from './instant-quote.component';

describe('InstantQuoteComponent', () => {
  let component: InstantQuoteComponent;
  let fixture: ComponentFixture<InstantQuoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstantQuoteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InstantQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
