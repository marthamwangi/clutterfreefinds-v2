import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WhoIsSectionComponent } from './who-is-section.component';

describe('WhoIsSectionComponent', () => {
  let component: WhoIsSectionComponent;
  let fixture: ComponentFixture<WhoIsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhoIsSectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WhoIsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
