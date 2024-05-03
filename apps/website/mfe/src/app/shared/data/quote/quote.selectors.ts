import { createSelector } from '@ngrx/store';
import { AppState } from '../../interface';
const iq = (state: AppState) => state.instant_quote;
const min = (state: AppState) => state.instant_quote.min_price;
const max = (state: AppState) => state.instant_quote.max_price;

const InstantQuoteSelector = createSelector(iq, (state) => state);
const MinPriceSelector = createSelector(min, (state) => state);
const MaxPriceSelector = createSelector(max, (state) => state);
const ResponseSelector = createSelector(iq, (state) => state.response);
const LoadingSelector = createSelector(iq, (state) => state.is_loading);

export const fromInstantQuoteSelector = {
  MinPriceSelector,
  MaxPriceSelector,
  InstantQuoteSelector,
  ResponseSelector,
  LoadingSelector,
};
