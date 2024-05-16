import { createReducer, on } from '@ngrx/store';
import { ICountyState } from '../../interface';
import { fromCountyActions } from './county.actions';

const initialState: ICountyState = {
  counties: [],
  selected_county: {
    name: '',
    constituencies: [],
    countyCode: 0,
  },
  selected_constituency: {
    name: '',
    wards: [],
  },
  selected_ward: '',
  is_loading: false,
  response: {
    success: false,
  },
};

export const COUNTY_REDUCER = createReducer(
  initialState,
  on(fromCountyActions.CountyPicker.list, (state) => ({
    ...state,
    is_loading: true,
  })),
  on(
    fromCountyActions.CountyAPI.countyListOnSuccess,
    (state, { counties }) => ({
      ...state,
      counties: counties,
      selected_county: counties[0],
      selected_constituency: counties[0].constituencies[0],
      selected_ward: counties[0].constituencies[0].wards[0],
      is_loading: false,
    })
  ),
  on(
    fromCountyActions.CountyAPI.countyListOnFailure,
    (state, { response }) => ({
      ...state,
      response,
      is_loading: false,
    })
  ),
  on(fromCountyActions.CountyPicker.county, (state, { selected }) => ({
    ...state,
    selected_county: selected,
  })),
  on(
    fromCountyActions.ConstituencyPicker.constituency,
    (state, { selected }) => ({
      ...state,
      selected_constituency: selected,
    })
  ),
  on(fromCountyActions.WardPicker.selected_ward, (state, { selected }) => ({
    ...state,
    selected_ward: selected,
  }))
);
