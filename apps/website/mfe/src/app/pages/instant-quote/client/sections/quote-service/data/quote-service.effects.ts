import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ICffServiceResponse } from '../model/cffSservice.model';
import { DeserializeCffService } from '../mappers/cffService.mapper';
import { fromCffServiceActions } from './quote-service.actions';

@Injectable({
  providedIn: 'root',
})
export class CFFServiceEffects {
  #actions: Actions = inject(Actions);
  #store: Store = inject(Store);
  #http: HttpClient = inject(HttpClient);
  #deserializeCffServices: DeserializeCffService = new DeserializeCffService();

  load$ = createEffect(() =>
    this.#actions.pipe(
      ofType(fromCffServiceActions.getCffServicesFromBE),
      switchMap(({ url }) => this.#http.get<ICffServiceResponse>(url)),
      map((response) =>
        fromCffServiceActions.setCffServiceToStore({
          cffServices: this.#deserializeCffServices.deserialize(response.data),
        })
      )
    )
  );
}