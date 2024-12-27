import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuoteMaterialComponent } from './quote-material.component';

describe('QuoteMaterialComponent', () => {
  let component: QuoteMaterialComponent;
  let fixture: ComponentFixture<QuoteMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuoteMaterialComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuoteMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
