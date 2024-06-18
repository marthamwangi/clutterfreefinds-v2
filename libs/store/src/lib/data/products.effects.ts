import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { ProducsMapper } from './products.mapper';
import { fromStoreActions } from './products.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { IStoreProductsResponse } from './products.model';

@Injectable({
  providedIn: 'root',
})
export class StoreEffects {
  #actions: Actions = inject(Actions);
  #http: HttpClient = inject(HttpClient);
  #mapper: ProducsMapper = new ProducsMapper();

  $load = createEffect(() =>
    this.#actions.pipe(
      ofType(fromStoreActions.StoreProducts.list),
      mergeMap((action) =>
        this.#http.get<IStoreProductsResponse>(action.url).pipe(
          map((res) =>
            fromStoreActions.StoreApi.storeListOnSuccess({
              response: this.#mapper.mapTo(res.data),
            })
          ),
          catchError((error) =>
            of(
              fromStoreActions.StoreApi.storeListOnFailure({
                response: error,
              })
            )
          )
        )
      )
    )
  );
}
