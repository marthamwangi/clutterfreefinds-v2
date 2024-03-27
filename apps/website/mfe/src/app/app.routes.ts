import { Route } from '@angular/router';

export const APP_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./components/home-page/home-page.component').then(
        (component) => component.HomePageComponent
      ),
    pathMatch: 'full',
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./components/about-us/about-us.component').then(
        (c) => c.AboutUsComponent
      ),
  },
  {
    path: 'instant-quote',
    loadComponent: () =>
      import('@clutterfreefinds-v2/instant-quote').then(
        (c) => c.InstantQuoteComponent
      ),
    pathMatch: 'full',
  },
  {
    path: 'privacy-policy',
    loadComponent: () =>
      import('./components/privacy-policy/privacy-policy.component').then(
        (c) => c.PrivacyPolicyComponent
      ),
  },
  {
    path: 'service-agreement',
    loadComponent: () =>
      import('./components/service-agreement/service-agreement.component').then(
        (c) => c.ServiceAgreementComponent
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
