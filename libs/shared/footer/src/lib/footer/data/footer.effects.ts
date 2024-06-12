import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { InquiryMapper } from './footer.mapper';
import { fromFooterActions } from './footer.actions';

@Injectable({
  providedIn: 'root',
})
export class FooterEffects {
  #actions: Actions = inject(Actions);
  #http: HttpClient = inject(HttpClient);
  #mapper: InquiryMapper = new InquiryMapper();
  add$ = createEffect(() =>
    this.#actions.pipe(
      ofType(fromFooterActions.InquiryRequest.inquiry),
      mergeMap(({ url, inquiry }) =>
        this.#http.post<any>(url, this.#mapper.mapTo(inquiry)).pipe(
          map((res) =>
            fromFooterActions.InquiryApi.inquiryAddOnSuccess({
              response: res,
            })
          ),
          catchError((error) =>
            of(
              fromFooterActions.InquiryApi.inquiryAddOnFailure({
                response: error,
              })
            )
          )
        )
      )
    )
  );
}
