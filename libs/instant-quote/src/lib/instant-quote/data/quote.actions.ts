import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IResponseModel } from '@clutterfreefinds-v2/globals';

const QuotePrice = createActionGroup({
  source: 'Instant Quote Component',
  events: {
    data: props<{
      min_price: number;
      max_price: number;
      service_date: string;
    }>(),
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
    'Quote Add On Success': props<{ response: IResponseModel }>(),
    'Quote Add On Failure': props<{ response: IResponseModel }>(),
  },
});

export const fromInstantQuoteActions = {
  QuotePrice,
  QuoteApi,
  Quote,
};
