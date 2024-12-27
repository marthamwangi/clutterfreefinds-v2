import { AppState } from '@clutterfreefinds-v2/globals';
import { createSelector } from '@ngrx/store';

const isLoading = (state: AppState) => state.store.is_loading;
const response = (state: AppState) => state.store.response;
const allStoreProducts = (state: AppState) => state.store.store_products;
const allStoreCategories = (state: AppState) => state.store.store_categories;

const selectStoreProductsList = createSelector(
  allStoreProducts,
  (statePiece) => statePiece
);

const selectStoreCategoriesList = createSelector(
  allStoreCategories,
  (statePiece) => statePiece
);

const selectLoadingList = createSelector(isLoading, (statePiece) => statePiece);
const selectResponse = createSelector(response, (statePiece) => statePiece);

export const fromStoreProductsSelector = {
  selectLoadingList,
  selectResponse,
  selectStoreProductsList,
  selectStoreCategoriesList,
};
