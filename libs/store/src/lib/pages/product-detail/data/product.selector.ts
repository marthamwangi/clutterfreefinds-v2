import { AppState } from '@clutterfreefinds-v2/globals';
import { createSelector } from '@ngrx/store';

const isLoading = (state: AppState) => state.selected_product.is_loading;
const response = (state: AppState) => state.selected_product.response;
const product = (state: AppState) => state.selected_product.product;

const selectProduct = createSelector(product, (statePiece) => statePiece);

const selectLoadingList = createSelector(isLoading, (statePiece) => statePiece);
const selectResponse = createSelector(response, (statePiece) => statePiece);

export const fromProductSelector = {
  selectLoadingList,
  selectResponse,
  selectProduct,
};
