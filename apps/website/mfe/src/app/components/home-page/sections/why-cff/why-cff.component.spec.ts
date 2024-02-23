import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WhyCffComponent } from './why-cff.component';

describe('WhyCffComponent', () => {
  let component: WhyCffComponent;
  let fixture: ComponentFixture<WhyCffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhyCffComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WhyCffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
