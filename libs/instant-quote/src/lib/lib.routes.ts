import { Route } from '@angular/router';

export const INSTANT_QUOTE_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./instant-quote/instant-quote.component').then(
        (c) => c.InstantQuoteComponent
      ),
  },
];
