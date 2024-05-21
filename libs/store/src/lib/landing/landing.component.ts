import { Component } from '@angular/core';
import { HeroShopComponent } from './components/hero-shop/hero-shop.component';

@Component({
  selector: 'landing',
  standalone: true,
  imports: [HeroShopComponent],
  templateUrl: './landing.component.html',
})
export class LandingComponent {}
