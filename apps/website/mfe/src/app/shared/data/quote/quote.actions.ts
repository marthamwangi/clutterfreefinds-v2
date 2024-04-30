import { createActionGroup, props } from '@ngrx/store';

const QuotePrice = createActionGroup({
  source: 'Instant Quote Component',
  events: {
    min_price: props<{ min_price: number }>(),
    max_price: props<{ max_price: number }>(),
  },
});

export const fromInstantQuoteActions = {
  QuotePrice,
};
