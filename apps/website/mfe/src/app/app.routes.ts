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
  // {
  //   path: 'instant-quote',
  //   loadComponent: () =>
  //     import('apps/instant-quote/mfe/src/app/app.component').then(
  //       (c) => c.AppComponent
  //     ),
  //   pathMatch: 'full',
  // },
  {
    path: '**',
    redirectTo: '',
  },
];
