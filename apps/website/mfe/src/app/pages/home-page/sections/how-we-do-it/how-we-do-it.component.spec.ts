import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HowWeDoItComponent } from './how-we-do-it.component';

describe('HowWeDoItComponent', () => {
  let component: HowWeDoItComponent;
  let fixture: ComponentFixture<HowWeDoItComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HowWeDoItComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HowWeDoItComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
