import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { SingleProductMapper } from './product.mapper';
import { catchError, map, mergeMap, of } from 'rxjs';
import { fromSingleProductActions } from './product.actions';
import { IProductResponse } from './product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductEffects {
  #actions: Actions = inject(Actions);
  #http: HttpClient = inject(HttpClient);
  #mapper: SingleProductMapper = new SingleProductMapper();

  $load = createEffect(() =>
    this.#actions.pipe(
      ofType(fromSingleProductActions.SingleProduct.get),
      mergeMap(({ url, param }) =>
        this.#http.get<IProductResponse>(`${url}/${param}`).pipe(
          map((res) =>
            fromSingleProductActions.StoreApi.productDetailOnSuccess({
              product: this.#mapper.mapTo(res.data),
            })
          ),
          catchError((error) =>
            of(
              fromSingleProductActions.StoreApi.productDetailOnFailure({
                response: error,
              })
            )
          )
        )
      )
    )
  );
}
