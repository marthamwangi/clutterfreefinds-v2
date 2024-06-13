import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DeserializeSpace } from './space.mapper';
import { fromCffSpacesActions } from './quote-space.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { SpaceResponse } from './space.model';

@Injectable({
  providedIn: 'root',
})
export class CFFSpacesEffects {
  #actions: Actions = inject(Actions);
  #http: HttpClient = inject(HttpClient);
  #deserializeSpace: DeserializeSpace = new DeserializeSpace();
  load$ = createEffect(() =>
    this.#actions.pipe(
      ofType(fromCffSpacesActions.getCffSpacesFromBE),
      mergeMap(({ url }) =>
        this.#http.get<SpaceResponse>(url).pipe(
          map((response) =>
            fromCffSpacesActions.QuoteSpaceApi.quoteSpaceOnSuccess({
              response: this.#deserializeSpace.deserialize(response.data),
            })
          ),
          catchError((error) =>
            of(
              fromCffSpacesActions.QuoteSpaceApi.quoteSpaceOnFailure({
                response: error,
              })
            )
          )
        )
      )
    )
  );
}
