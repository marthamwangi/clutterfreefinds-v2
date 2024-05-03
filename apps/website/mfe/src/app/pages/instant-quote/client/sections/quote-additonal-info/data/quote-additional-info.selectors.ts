import { createSelector } from '@ngrx/store';
import { AppState } from 'apps/website/mfe/src/app/shared/interface';

const quote_images = (state: AppState) =>
  state.quote_additional_info.quote_additional_info.images;
const quote_notes = (state: AppState) =>
  state.quote_additional_info.quote_additional_info.notes;

const quoteImagesSelector = createSelector(
  quote_images,
  (statepiece) => statepiece
);

const quoteNotesSelector = createSelector(
  quote_notes,
  (statepiece) => statepiece
);

export const fromAdditionalInfoSelectors = {
  quoteImagesSelector,
  quoteNotesSelector,
};
