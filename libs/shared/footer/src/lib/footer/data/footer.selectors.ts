import { AppState } from '@clutterfreefinds-v2/globals';
import { createSelector } from '@ngrx/store';
const inquiry = (state: AppState) => state.inquiry_request;

const ResponseSelector = createSelector(inquiry, (state) => state.response);
const LoadingSelector = createSelector(inquiry, (state) => state.is_loading);

export const fromInquirySelector = {
  ResponseSelector,
  LoadingSelector,
};
