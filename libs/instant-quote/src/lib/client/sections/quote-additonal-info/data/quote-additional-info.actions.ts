import { createAction, props } from '@ngrx/store';
import { fromAdditionalInfoActionNames } from './quote-additional-info.action-names';

const SET_QUOTE_ADDITIONAL_INFO = createAction(
  fromAdditionalInfoActionNames.createStateAdditionalInfo,
  props<{
    quote_additional_info: {
      images?: Array<string>;
      notes?: string;
    };
  }>()
);

const UPDATE_QUOTE_ADDITIONAL_INFO = createAction(
  fromAdditionalInfoActionNames.updateAdditionalInfo,
  props<{
    quote_additional_info: {
      images?: Array<string>;
      notes?: string;
    };
  }>()
);

export const fromAdditionalInfoActions = {
  SET_QUOTE_ADDITIONAL_INFO,
  UPDATE_QUOTE_ADDITIONAL_INFO,
};
