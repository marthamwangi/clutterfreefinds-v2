import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DeserializeMaterial } from './material.mapper';
import { fromMaterialActions } from './quote-material.action';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { MaterialResponse } from './material.model';

@Injectable({
  providedIn: 'root',
})
export class MaterialEffects {
  #actions: Actions = inject(Actions);
  #http: HttpClient = inject(HttpClient);
  #deserializeMaterials: DeserializeMaterial = new DeserializeMaterial();

  load$ = createEffect(() =>
    this.#actions.pipe(
      ofType(fromMaterialActions.getMaterialsFromBE),
      exhaustMap(({ url }) =>
        this.#http.get<MaterialResponse>(url).pipe(
          map((response) =>
            fromMaterialActions.QuoteMaterialApi.quoteMaterialOnSuccess({
              response: this.#deserializeMaterials.deserialize(response.data),
            })
          ),
          catchError((error) =>
            of(
              fromMaterialActions.QuoteMaterialApi.quoteMaterialOnFailure({
                response: error,
              })
            )
          )
        )
      )
    )
  );
}
