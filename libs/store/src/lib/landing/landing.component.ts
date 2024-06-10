import { Component } from '@angular/core';
import { HeroShopComponent } from './components/hero-shop/hero-shop.component';
import { ShopFeaturesComponent } from './components/shop-features/shop-features.component';
import { TopProductsComponent } from './components/top-products/top-products.component';

@Component({
  selector: 'landing',
  standalone: true,
  imports: [HeroShopComponent, ShopFeaturesComponent, TopProductsComponent],
  templateUrl: './landing.component.html',
})
export class LandingComponent {}
