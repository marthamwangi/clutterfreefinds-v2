import { createSelector } from '@ngrx/store';
import { AppState } from 'apps/website/mfe/src/app/shared/interface';

const allServices = (state: AppState) => state.cff_services.cffServices;
const activeService = (state: AppState) => state.cff_services.selected_service;

const selectActiveService = createSelector(
  activeService,
  (statePiece) => statePiece
);

const selectServiceList = createSelector(
  allServices,
  (statePiece) => statePiece
);

const selectActiveServiceStatus = createSelector(
  activeService,
  (state) => state
);

export const fromCffServiceSelectors = {
  selectActiveService,
  selectServiceList,
  selectActiveServiceStatus,
};
