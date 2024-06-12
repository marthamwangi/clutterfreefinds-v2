import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IResponseModel } from '@clutterfreefinds-v2/globals';
const InquiryRequest = createActionGroup({
  source: 'Footer Component',
  events: {
    Inquiry: props<{ url: string; inquiry: any }>(),
  },
});
const InquiryApi = createActionGroup({
  source: 'Inquiry Request API',
  events: {
    'Inquiry Loading': emptyProps(),
    'Inquiry Add On Success': props<{ response: IResponseModel }>(),
    'Inquiry Add On Failure': props<{ response: IResponseModel }>(),
  },
});

export const fromFooterActions = {
  InquiryApi,
  InquiryRequest,
};
