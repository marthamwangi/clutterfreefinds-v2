import { createSelector } from '@ngrx/store';
import { AppState, ICffService } from '../model/cffSservice.model';

const allServices = (state: AppState) => state.cff_store.cffServices;
const activeService = (state: AppState) => state.cff_store.selected_service;

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
  (state) => state.isSelected
);

export const fromCffServiceSelectors = {
  selectActiveService,
  selectServiceList,
  selectActiveServiceStatus,
};
