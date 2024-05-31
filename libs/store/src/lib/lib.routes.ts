import { Route } from '@angular/router';

export const STORE_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./landing/landing.component').then((c) => c.LandingComponent),
  },
];
