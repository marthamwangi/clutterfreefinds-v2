import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ICffServiceResponse } from '../model/cffSservice.model';
import { DeserializeCffService } from '../mappers/cffService.mapper';
import { fromCffServiceActions } from './quote-service.actions';
import { Store } from '@ngrx/store';
import {} from './quote-service.selectors';
import { AppState } from 'apps/website/mfe/src/app/shared/interface';

@Injectable({
  providedIn: 'root',
})
export class CFFServiceEffects {
  #actions: Actions = inject(Actions);
  #http: HttpClient = inject(HttpClient);
  #store: Store<AppState> = inject(Store);
  #deserializeCffServices: DeserializeCffService = new DeserializeCffService();

  load$ = createEffect(() =>
    this.#actions.pipe(
      ofType(fromCffServiceActions.getCffServicesFromBE),
      mergeMap((action) => this.#http.get<ICffServiceResponse>(action.url)),
      map((response) =>
        fromCffServiceActions.setCffServiceToStore({
          cffServices: this.#deserializeCffServices.deserialize(response.data),
        })
      )
    )
  );
}
