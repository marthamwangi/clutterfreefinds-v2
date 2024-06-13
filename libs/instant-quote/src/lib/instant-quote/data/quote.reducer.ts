import { createReducer, on } from '@ngrx/store';
import { fromInstantQuoteActions } from './quote.actions';
import { InstantQuoteState } from '@clutterfreefinds-v2/globals';

const initialState: InstantQuoteState = {
  service_date: '',
  min_price: 0,
  max_price: 0,
  is_loading: false,
  response: {
    success: false,
  },
};

export const INSTANT_QUOTE_REDUCER = createReducer(
  initialState,
  on(
    fromInstantQuoteActions.QuotePrice.data,
    (state, { min_price, max_price, service_date }) => ({
      ...state,
      min_price,
      max_price,
      service_date,
    })
  ),
  on(fromInstantQuoteActions.Quote.quoteAdd, (state) => ({
    ...state,
    is_loading: true,
  })),
  on(
    fromInstantQuoteActions.QuoteApi.quoteAddOnSuccess,
    (state, { response }) => ({
      ...state,
      response: response,
      is_loading: false,
    })
  ),
  on(
    fromInstantQuoteActions.QuoteApi.quoteAddOnFailure,
    (state, { response }) => ({
      ...state,
      response: response,
      is_loading: false,
    })
  )
);
