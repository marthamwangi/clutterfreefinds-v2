import { AppState } from '@clutterfreefinds-v2/globals';
import { createSelector } from '@ngrx/store';

const date = (state: AppState) => state.instant_quote.service_date;

const selectedServiceDate = createSelector(date, (statePiece) => statePiece);

export const fromCalendarSelector = {
  selectedServiceDate,
};
