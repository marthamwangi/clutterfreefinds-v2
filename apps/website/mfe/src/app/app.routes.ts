import { Route } from '@angular/router';

export const APP_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home-page/home-page.component').then(
        (component) => component.HomePageComponent
      ),
    pathMatch: 'full',
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./pages/about-us/about-us.component').then(
        (c) => c.AboutUsComponent
      ),
  },
  {
    path: 'how-it-works',
    loadComponent: () =>
      import('./pages/how-it-works-page/how-it-works-page.component').then(
        (c) => c.HowItWorksPageComponent
      ),
  },
  {
    path: 'instant-quote',
    loadComponent: () =>
      import('./pages/instant-quote/instant-quote.component').then(
        (c) => c.InstantQuoteComponent
      ),
    pathMatch: 'full',
  },
  {
    path: 'privacy-policy',
    loadComponent: () =>
      import('./pages/privacy-policy/privacy-policy.component').then(
        (c) => c.PrivacyPolicyComponent
      ),
  },
  {
    path: 'service-agreement',
    loadComponent: () =>
      import('./pages/service-agreement/service-agreement.component').then(
        (c) => c.ServiceAgreementComponent
      ),
  },
  {
    path: 'store',
    loadChildren: () =>
      import('@clutterfreefinds-v2/store').then((lib) => lib.STORE_ROUTES),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/coming-soon/coming-soon.component').then(
        (c) => c.ComingSoonComponent
      ),
  },
];
