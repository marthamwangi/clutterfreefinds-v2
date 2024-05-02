import { createActionGroup, emptyProps, props } from '@ngrx/store';

const QuotePrice = createActionGroup({
  source: 'Instant Quote Component',
  events: {
    min_price: props<{ min_price: number }>(),
    max_price: props<{ max_price: number }>(),
  },
});

const Quote = createActionGroup({
  source: 'Quote Summary Component',
  events: {
    'Quote Add': props<{ url: string; quotation: any }>(),
  },
});

const QuoteApi = createActionGroup({
  source: 'Quote Request API',
  events: {
    'Quote Loading': emptyProps(),
    'Quote Add On Success': props<{ success: string }>(),
    'Quote Add On Failure': props<{ error: string }>(),
  },
});

export const fromInstantQuoteActions = {
  QuotePrice,
  QuoteApi,
  Quote,
};