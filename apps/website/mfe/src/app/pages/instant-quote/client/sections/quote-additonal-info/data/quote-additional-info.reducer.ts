import { createReducer, on } from '@ngrx/store';
import { IAdditionalInfoState } from 'apps/website/mfe/src/app/shared/interface';
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
