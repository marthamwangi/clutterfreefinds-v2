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
  on(fromCountyActions.WardPicker.ward, (state, { selected }) => ({
    ...state,
    ward: selected,
  }))
);
