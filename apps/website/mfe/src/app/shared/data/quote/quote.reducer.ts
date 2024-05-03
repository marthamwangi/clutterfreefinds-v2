import { createReducer, on } from '@ngrx/store';
import { fromInstantQuoteActions } from './quote.actions';
import { InstantQuoteState } from '../../interface';

const initialState: InstantQuoteState = {
  min_price: 0,
  max_price: 0,
  is_loading: false,
  response: {},
};

export const INSTANT_QUOTE_REDUCER = createReducer(
  initialState,
  on(fromInstantQuoteActions.QuotePrice.min_price, (state, { min_price }) => ({
    ...state,
    min_price: min_price,
  })),
  on(fromInstantQuoteActions.QuotePrice.max_price, (state, { max_price }) => ({
    ...state,
    max_price: max_price,
  })),
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
