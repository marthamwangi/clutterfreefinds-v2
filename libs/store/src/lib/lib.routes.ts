import { Route } from '@angular/router';

export const STORE_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/landing/landing.component').then(
        (c) => c.LandingComponent
      ),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./pages/product-detail/product-detail.component').then(
        (c) => c.ProductDetailComponent
      ),
  },
];
