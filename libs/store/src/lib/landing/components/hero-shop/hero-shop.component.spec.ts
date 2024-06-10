import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroShopComponent } from './hero-shop.component';

describe('HeroShopComponent', () => {
  let component: HeroShopComponent;
  let fixture: ComponentFixture<HeroShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroShopComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
