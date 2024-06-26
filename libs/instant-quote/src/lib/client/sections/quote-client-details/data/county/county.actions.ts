import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IConstituencyModel, ICountyModel } from './county.model';
import { IResponseModel } from '@clutterfreefinds-v2/globals';

const CountyPicker = createActionGroup({
  source: 'Quote Client Details Component',
  events: {
    list: props<{ url: string }>(),
    county: props<{ selected: ICountyModel }>(),
  },
});

const ConstituencyPicker = createActionGroup({
  source: 'Quote Client Details Component',
  events: {
    constituency: props<{ selected: IConstituencyModel }>(),
  },
});

const WardPicker = createActionGroup({
  source: 'Quote Client Details Component',
  events: {
    selected_ward: props<{ selected: string }>(),
  },
});
const CountyAPI = createActionGroup({
  source: 'County API',
  events: {
    'County Loading': emptyProps(),
    'County List On Success': props<{ counties: Array<ICountyModel> }>(),
    'County List On Failure': props<{ response: IResponseModel }>(),
  },
});

export const fromCountyActions = {
  CountyPicker,
  CountyAPI,
  ConstituencyPicker,
  WardPicker,
};
