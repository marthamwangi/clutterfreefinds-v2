import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ICffServiceResponse } from './cffSservice.model';
import { DeserializeCffService } from './cffService.mapper';
import { fromCffServiceActions } from './quote-service.actions';
import {} from './quote-service.selectors';
@Injectable({
  providedIn: 'root',
})
export class CFFServiceEffects {
  #actions: Actions = inject(Actions);
  #http: HttpClient = inject(HttpClient);
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
