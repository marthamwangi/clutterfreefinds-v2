import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DeserializeCounty } from '../../mappers/county.mapper';
import { fromCountyActions } from './county.actions';
import { HttpClient } from '@angular/common/http';
import { catchError, map, mergeMap, of } from 'rxjs';
import { CountyResponse } from '../../models/county.model';

@Injectable({
  providedIn: 'root',
})
export class CountyEffects {
  #actions: Actions = inject(Actions);
  #http: HttpClient = inject(HttpClient);
  #deserializeCounty: DeserializeCounty = new DeserializeCounty();
  load$ = createEffect(() =>
    this.#actions.pipe(
      ofType(fromCountyActions.CountyPicker.list),
      mergeMap(({ url }) =>
        this.#http.get<CountyResponse>(url).pipe(
          map((response) =>
            fromCountyActions.CountyAPI.countyListOnSuccess({
              counties: this.#deserializeCounty.deserialize(response.data),
            })
          ),
          catchError((error) =>
            of(
              fromCountyActions.CountyAPI.countyListOnFailure({
                response: error,
              })
            )
          )
        )
      )
    )
  );
}
