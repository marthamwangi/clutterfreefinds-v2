import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./components/home-page/home-page.component').then(
        (component) => component.HomePageComponent
      ),
    pathMatch: 'full',
  },
];
