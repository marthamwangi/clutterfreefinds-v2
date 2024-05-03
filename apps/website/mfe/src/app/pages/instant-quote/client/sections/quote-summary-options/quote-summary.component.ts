import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
  inject,
} from '@angular/core';
import {
  AsyncPipe,
  CurrencyPipe,
  NgIf,
  NgTemplateOutlet,
} from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState } from 'apps/website/mfe/src/app/shared/interface';
import { Observable, Subject, firstValueFrom, takeUntil } from 'rxjs';
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
import { IResponseModel } from 'apps/website/mfe/src/app/shared/response.model';

@Component({
  selector: 'iq-quote-summary',
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe, NgTemplateOutlet, NgIf],
  templateUrl: './quote-summary.component.html',
  styleUrls: ['./quote-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuoteSummaryComponent implements OnInit {
  @Input() instantQuote: any;
  @ViewChild('loadingRef')
  private _loadingRef!: TemplateRef<any>;
  @ViewChild('responseErrorRef')
  private _responseError!: TemplateRef<any>;
  @ViewChild('responseSuccessRef')
  private _responseSuccess!: TemplateRef<any>;

  #changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);
  #store: Store<AppState> = inject(Store);
  #unsubscribe$: Subject<boolean>;

  modalView!: number;
  service_selected$: Observable<ICffService>;
  space_selected$: Observable<ISpaceModel>;
  material_selected$: Observable<IMaterialModel>;
  images$: Observable<any>;
  notes$: Observable<any>;
  client_details$: Observable<any>;
  county_details$: Observable<any>;
  instant_quote$: Observable<any>;

  constructor() {
    this.#unsubscribe$ = new Subject<boolean>();
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
  ngOnInit(): void {
    this._listenForModalStatus();
  }
  ngOnDestroy(): void {
    this.#unsubscribe$.next(true);
    this.#unsubscribe$.complete();
  }
  public _commonChangeDetector(): void {
    this.#changeDetectorRef.detectChanges();
  }

  private _listenForModalStatus() {
    this.instant_quote$
      .pipe(takeUntil(this.#unsubscribe$))
      .subscribe((iq: any) => {
        if (iq.is_loading) {
          this.modalView = 1;
        } else if (iq.response.success) {
          this.modalView = 2;
          /**
           * Refresh page
           */
        } else if (!iq.response.success) {
          this.modalView = 0;
        }
        this._commonChangeDetector();
      });
  }

  public returnModalTemplate(): TemplateRef<any> {
    const templateMap: any = {
      0: this._responseError,
      1: this._loadingRef,
      2: this._responseSuccess,
    };
    return templateMap[this.modalView];
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
