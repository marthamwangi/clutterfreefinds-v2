import { AppState } from '@clutterfreefinds-v2/globals';
import { createSelector } from '@ngrx/store';

const isLoading = (state: AppState) => state.cart.is_loading;
const response = (state: AppState) => state.cart.response;
const allCartProducts = (state: AppState) => state.cart.products;
const cartCount = (state: AppState) => state.cart.products.length;

const selectCartProductsList = createSelector(
  allCartProducts,
  (statePiece) => statePiece
);

const selectLoadingList = createSelector(isLoading, (statePiece) => statePiece);
const selectResponse = createSelector(response, (statePiece) => statePiece);
const selectCartCount = createSelector(cartCount, (statePiece) => statePiece);
export const fromCartSelector = {
  selectLoadingList,
  selectResponse,
  selectCartProductsList,
  selectCartCount,
};
