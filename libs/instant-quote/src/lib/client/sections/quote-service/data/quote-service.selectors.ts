import { createSelector } from '@ngrx/store';
import { AppState } from '@clutterfreefinds-v2/globals';

const isLoading = (state: AppState) => state.cff_services.is_loading;
const response = (state: AppState) => state.cff_services.response;
const allServices = (state: AppState) => state.cff_services.cffServices;
const selectedService = (state: AppState) =>
  state.cff_services.selected_service;

const selectActiveService = createSelector(
  selectedService,
  (statePiece) => statePiece
);

const selectServiceList = createSelector(
  allServices,
  (statePiece) => statePiece
);

const selectLoadingList = createSelector(isLoading, (statePiece) => statePiece);
const selectResponse = createSelector(response, (statePiece) => statePiece);
export const fromCffServiceSelectors = {
  selectActiveService,
  selectServiceList,
  selectLoadingList,
  selectResponse,
};
