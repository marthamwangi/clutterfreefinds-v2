import { IInquiryRequestState } from '@clutterfreefinds-v2/globals';
import { createReducer, on } from '@ngrx/store';
import { fromFooterActions } from './footer.actions';

const initialState: IInquiryRequestState = {
  name: '',
  email: '',
  message: '',
  phone: '',
  is_loading: false,
  response: {
    success: false,
  },
};

export const INQUIRY_REQUEST_REDUCER = createReducer(
  initialState,
  on(fromFooterActions.InquiryRequest.inquiry, (state) => ({
    ...state,
    is_loading: true,
  })),
  on(
    fromFooterActions.InquiryApi.inquiryAddOnSuccess,
    (state, { response }) => ({
      ...state,
      response: response,
      is_loading: false,
    })
  ),
  on(
    fromFooterActions.InquiryApi.inquiryAddOnFailure,
    (state, { response }) => ({
      ...state,
      response: response,
      is_loading: false,
    })
  )
);
