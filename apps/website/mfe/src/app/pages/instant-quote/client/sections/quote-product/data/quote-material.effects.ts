import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DeserializeMaterial } from '../mapper/material.mapper';
import { fromMaterialActions } from './quote-material.action';
import { exhaustMap, map } from 'rxjs';
import { MaterialResponse } from '../models/material.model';

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
      exhaustMap(({ url }) => this.#http.get<MaterialResponse>(url)),
      map((response) =>
        fromMaterialActions.setMaterialToStore({
          cffMaterials: this.#deserializeMaterials.deserialize(response.data),
        })
      )
    )
  );
}
