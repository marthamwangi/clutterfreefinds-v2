import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, finalize, map, mergeMap, of } from 'rxjs';
import { fromCartActions } from './cart.actions';
import { ClientStorageService } from '../../../services/localstorage.service';
import { AppState, CART_STORAGE_KEY } from '@clutterfreefinds-v2/globals';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class CartEffects {
  #actions: Actions = inject(Actions);
  #storageService: ClientStorageService = inject(ClientStorageService);
  #store: Store<AppState> = inject(Store);

  $load = createEffect(() =>
    this.#actions.pipe(
      ofType(
        fromCartActions.Cart.load,
        fromCartActions.CartLandingComponentAcions.load,
        fromCartActions.CartButtonAction.load
      ),
      mergeMap((props) =>
        of(
          this.#storageService.StorageAPI(
            'read',
            CART_STORAGE_KEY,
            props.payload
          )
        ).pipe(
          map((res) =>
            fromCartActions.CartAPI.cartListOnSuccess({
              response: {
                data: res,
                success: true,
                message: 'Fetched Cart products Successfully',
              },
            })
          ),
          catchError((error) =>
            of(
              fromCartActions.CartAPI.cartListOnFailure({
                response: {
                  success: false,
                  message:
                    'An Error Occured while trying to fetch items on cart',
                },
              })
            )
          )
        )
      )
    )
  );

  $add = createEffect(() =>
    this.#actions.pipe(
      ofType(fromCartActions.CartButtonAction.add),
      mergeMap((props) =>
        of(
          this.#storageService.StorageAPI(
            'create',
            CART_STORAGE_KEY,
            props.payload
          )
        ).pipe(
          map((res) =>
            fromCartActions.CartAPI.cartCreateOnSuccess({
              response: {
                success: true,
                message: 'Added To Cart Successfully',
              },
            })
          ),
          catchError((error) =>
            of(
              fromCartActions.CartAPI.cartListOnFailure({
                response: {
                  success: false,
                  message: 'An Error Occured while trying to add item to cart',
                },
              })
            )
          ),
          finalize(() =>
            this.#store.dispatch(
              fromCartActions.Cart.load({
                payload: { read: 'many' },
              })
            )
          )
        )
      )
    )
  );

  $update = createEffect(() =>
    this.#actions.pipe(
      ofType(fromCartActions.CartLandingComponentAcions.update),
      mergeMap((props) =>
        of(
          this.#storageService.StorageAPI(
            'update',
            CART_STORAGE_KEY,
            props.payload
          )
        ).pipe(
          map((res) =>
            fromCartActions.CartAPI.cartUpdateOnSuccess({
              response: {
                success: true,
                message: 'Update To Cart Successfully',
              },
            })
          ),
          catchError((error) =>
            of(
              fromCartActions.CartAPI.cartUpdateOnFailure({
                response: {
                  success: false,
                  message:
                    'An Error Occured while trying to Update items in cart',
                },
              })
            )
          ),
          finalize(() =>
            this.#store.dispatch(
              fromCartActions.Cart.load({
                payload: { read: 'many' },
              })
            )
          )
        )
      )
    )
  );
}
