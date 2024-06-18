import { AppState } from '@clutterfreefinds-v2/globals';
import { createSelector } from '@ngrx/store';

const isLoading = (state: AppState) => state.store_products.is_loading;
const response = (state: AppState) => state.store_products.response;
const allStoreProducts = (state: AppState) =>
  state.store_products.store_products;

const selectStoreProductsList = createSelector(
  allStoreProducts,
  (statePiece) => statePiece
);

const selectLoadingList = createSelector(isLoading, (statePiece) => statePiece);
const selectResponse = createSelector(response, (statePiece) => statePiece);

export const fromStoreProductsSelector = {
  selectLoadingList,
  selectResponse,
  selectStoreProductsList,
};
