import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fromInstantQuoteActions } from './quote.actions';
import { map, mergeMap } from 'rxjs';
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
        this.#http.post<any>(url, this.#mapper.mapTo(quotation))
      )
    )
  );
}
