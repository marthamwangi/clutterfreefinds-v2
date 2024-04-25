import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DeserializeSpace } from '../mappers/space.mapper';
import { fromCffSpacesActions } from './quote-space.actions';
import { exhaustMap, map } from 'rxjs';
import { SpaceResponse } from '../models/space.model';

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
      exhaustMap(({ url }) => this.#http.get<SpaceResponse>(url)),
      map((response) =>
        fromCffSpacesActions.setCffSpacesToStore({
          cffSpaces: this.#deserializeSpace.deserialize(response.data),
        })
      )
    )
  );
}
