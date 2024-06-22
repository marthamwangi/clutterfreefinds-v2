import { Route } from '@angular/router';

export const STORE_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./store.component').then((c) => c.StoreComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/landing/landing.component').then(
            (c) => c.LandingComponent
          ),
      },
      {
        path: 'product/:id',
        loadComponent: () =>
          import('./pages/product-detail/product-detail.component').then(
            (c) => c.ProductDetailComponent
          ),
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('./pages/stepper/stepper.component').then(
            (c) => c.StepperComponent
          ),
      },
    ],
  },
];
