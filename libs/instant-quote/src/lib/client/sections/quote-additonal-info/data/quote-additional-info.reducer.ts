import { createReducer, on } from '@ngrx/store';
import { IAdditionalInfoState } from '@clutterfreefinds-v2/globals';
import { fromAdditionalInfoActions } from './quote-additional-info.actions';

const initialState: IAdditionalInfoState = {
  quote_additional_info: {
    images: [],
    notes: '',
  },
};

export const ADDITIONAL_INFO_REDUCER = createReducer(
  initialState,
  on(
    fromAdditionalInfoActions.SET_QUOTE_ADDITIONAL_INFO,
    (state, { quote_additional_info }) => ({
      ...state,
      quote_additional_info,
    })
  )
);
