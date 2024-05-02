import { createSelector } from '@ngrx/store';
import { AppState } from '../../interface';

const is_loading = (state: AppState) => state.cff_county.is_loading;
const list_counties = (state: AppState) => state.cff_county.counties;
const selected = (state: AppState) => state.cff_county;

const ClientCountyDetails = createSelector(selected, (state) => state);
const ListCounties = createSelector(list_counties, (state) => state);
const LoadingStatus = createSelector(is_loading, (state) => state);
const SelectedCounty = createSelector(
  selected,
  (state) => state.selected_county
);
const SelectedConstituency = createSelector(
  selected,
  (state) => state.selected_constituency
);
const SelectedWard = createSelector(selected, (state) => state.selected_ward);

export const fromCountySelector = {
  ListCounties,
  LoadingStatus,
  SelectedCounty,
  SelectedConstituency,
  SelectedWard,
  ClientCountyDetails,
};