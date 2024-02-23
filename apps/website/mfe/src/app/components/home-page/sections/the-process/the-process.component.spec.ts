import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TheProcessComponent } from './the-process.component';

describe('TheProcessComponent', () => {
  let component: TheProcessComponent;
  let fixture: ComponentFixture<TheProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TheProcessComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TheProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
