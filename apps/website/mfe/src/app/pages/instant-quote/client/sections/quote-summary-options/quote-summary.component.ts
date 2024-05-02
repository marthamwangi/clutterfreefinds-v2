import { Component, Input, inject } from '@angular/core';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState } from 'apps/website/mfe/src/app/shared/interface';
import { Observable, firstValueFrom } from 'rxjs';
import { ICffService } from '../quote-service/model/cffSservice.model';
import { fromCffServiceSelectors } from '../quote-service/data/quote-service.selectors';
import { ISpaceModel } from '../quote-space/models/space.model';
import { IMaterialModel } from '../quote-material/models/material.model';
import { fromSpaceSelectors } from '../quote-space/data/quote-space.selectors';
import { fromMaterialSelectors } from '../quote-material/data/quote-material.selectors';
import { fromAdditionalInfoSelectors } from '../quote-additonal-info/data/quote-additional-info.selectors';
import { fromClientDetailsSelector } from '../quote-client-details/data/quote-client-details.selector';
import { fromCountySelector } from 'apps/website/mfe/src/app/shared/data/county/county.selectors';
import { fromInstantQuoteSelector } from 'apps/website/mfe/src/app/shared/data/quote/quote.selectors';
import { fromInstantQuoteActions } from 'apps/website/mfe/src/app/shared/data/quote/quote.actions';
import {
  BASE_API,
  WEB_API_QUOTATION_REQUEST,
} from '@clutterfreefinds-v2/globals';

@Component({
  selector: 'iq-quote-summary',
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe],
  templateUrl: './quote-summary.component.html',
  styleUrls: ['./quote-summary.component.scss'],
})
export class QuoteSummaryComponent {
  @Input() instantQuote: any;
  #store: Store<AppState> = inject(Store);
  service_selected$: Observable<ICffService>;
  space_selected$: Observable<ISpaceModel>;
  material_selected$: Observable<IMaterialModel>;
  images$: Observable<any>;
  notes$: Observable<any>;
  client_details$: Observable<any>;
  county_details$: Observable<any>;
  instant_quote$: Observable<any>;

  constructor() {
    this.service_selected$ = this.#store.select(
      fromCffServiceSelectors.selectActiveService
    );
    this.space_selected$ = this.#store.select(
      fromSpaceSelectors.selectedSpaceSelector
    );
    this.material_selected$ = this.#store.select(
      fromMaterialSelectors.selectedMaterialSelector
    );
    this.images$ = this.#store.select(
      fromAdditionalInfoSelectors.quoteImagesSelector
    );
    this.notes$ = this.#store.select(
      fromAdditionalInfoSelectors.quoteNotesSelector
    );
    this.client_details$ = this.#store.select(
      fromClientDetailsSelector.ClientDetails
    );
    this.county_details$ = this.#store.select(
      fromCountySelector.ClientCountyDetails
    );
    this.instant_quote$ = this.#store.select(
      fromInstantQuoteSelector.InstantQuoteSelector
    );
  }

  async downloadImages() {
    const urls = await firstValueFrom(this.images$);

    let fetchFile = function (url: RequestInfo | URL) {
      return fetch(url).then((res) => res.blob());
    };

    let exportFile = function (file: Blob | MediaSource) {
      let a = document.createElement('a');
      a.href = URL.createObjectURL(file);
      a.setAttribute('download', '');
      a.click();
    };

    for (const url of urls) {
      fetchFile(url).then((file) => exportFile(file));
    }
  }

  onValidateQuote() {
    this.#store.dispatch(
      fromInstantQuoteActions.Quote.quoteAdd({
        url: `${BASE_API}/${WEB_API_QUOTATION_REQUEST}`,
        quotation: this.instantQuote,
      })
    );
  }
}
