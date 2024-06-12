import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ICffServiceResponse } from '../model/cffSservice.model';
import { DeserializeCffService } from '../mappers/cffService.mapper';
import { fromCffServiceActions } from './quote-service.actions';
import { Store } from '@ngrx/store';
import {} from './quote-service.selectors';
import { AppState } from '@clutterfreefinds-v2/globals';
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
      mergeMap((action) =>
        this.#http.get<ICffServiceResponse>(action.url).pipe(
          map((res) =>
            fromCffServiceActions.QuoteServiceApi.quoteServicesOnSuccess({
              response: this.#deserializeCffServices.deserialize(res.data),
            })
          ),
          catchError((error) =>
            of(
              fromCffServiceActions.QuoteServiceApi.quoteServicesOnFailure({
                response: error,
              })
            )
          )
        )
      )
    )
  );
}
