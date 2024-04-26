import { Injectable, inject } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { filter, map, mergeMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ICffServiceResponse } from '../model/cffSservice.model';
import { DeserializeCffService } from '../mappers/cffService.mapper';
import { fromCffServiceActions } from './quote-service.actions';
import { Store } from '@ngrx/store';
import { fromCffServiceSelectors } from './quote-service.selectors';
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
      concatLatestFrom(() =>
        this.#store.select(fromCffServiceSelectors.selectServiceList)
      ),
      filter(([action, cff_services]) => {
        return !cff_services.length ? true : false;
      }),
      mergeMap(([action, cff_services]) =>
        this.#http.get<ICffServiceResponse>(action.url)
      ),
      map((response) =>
        fromCffServiceActions.setCffServiceToStore({
          cffServices: this.#deserializeCffServices.deserialize(response.data),
        })
      )
    )
  );
}
