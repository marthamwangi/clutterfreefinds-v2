import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fromInstantQuoteActions } from './quote.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { QuoteMapper } from './quote.mapper';

@Injectable({
  providedIn: 'root',
})
export class QuoteEffects {
  #actions: Actions = inject(Actions);
  #http: HttpClient = inject(HttpClient);
  #mapper: QuoteMapper = new QuoteMapper();
  add$ = createEffect(() =>
    this.#actions.pipe(
      ofType(fromInstantQuoteActions.Quote.quoteAdd),
      mergeMap(({ url, quotation }) =>
        this.#http.post<any>(url, this.#mapper.mapTo(quotation)).pipe(
          map((res) =>
            fromInstantQuoteActions.QuoteApi.quoteAddOnSuccess({
              response: res,
            })
          ),
          catchError((error) =>
            of(
              fromInstantQuoteActions.QuoteApi.quoteAddOnFailure({
                response: error,
              })
            )
          )
        )
      )
    )
  );
}
