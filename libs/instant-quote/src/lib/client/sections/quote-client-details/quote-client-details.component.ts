import { Component, EventEmitter, Output, inject } from '@angular/core';
import {
  AppState,
  BASE_API,
  KENYA_COUNTIES,
  PHONE_REGEX,
  REGEX_EMAIL,
} from '@clutterfreefinds-v2/globals';
import { FormsModule } from '@angular/forms';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Observable, firstValueFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { SortPipe } from '@clutterfreefinds-v2/shared-pipes';
import { fromClientDetailsSelector } from './data/quote-client-details.selector';
import { fromClientDetailsActions } from './data/quote-client-details.actions';
import { IResponseModel } from '@clutterfreefinds-v2/globals';
import { ToastrService } from 'ngx-toastr';
import { IConstituencyModel, ICountyModel } from './data/county/county.model';
import { fromCountySelector } from './data/county/county.selectors';
import { fromCountyActions } from './data/county/county.actions';

@Component({
  selector: 'iq-quote-client-details',
  standalone: true,
  imports: [FormsModule, NgFor, AsyncPipe, SortPipe, NgIf],
  templateUrl: './quote-client-details.component.html',
})
export class QuoteClientDetailsComponent {
  @Output() clientData$: EventEmitter<any> = new EventEmitter<any>();
  #store: Store<AppState> = inject(Store);
  counties$!: Observable<Array<ICountyModel>>;
  selected_county$!: Observable<ICountyModel>;
  selected_constituency$!: Observable<IConstituencyModel>;
  isLoadingCounties$!: Observable<boolean>;
  selected_ward$!: Observable<string>;
  clienQuoteEmail$!: Observable<string>;
  clientQuoteFirstName$!: Observable<string>;
  clienQuoteLastName$!: Observable<string>;
  clientQuotePhoneNumber$!: Observable<string>;
  clientQuoteAddress$!: Observable<string>;
  clientQuoteHseNumber$: Observable<string>;
  clientQuoteServiceType$: Observable<string>;
  #countyFetchResponse$: Observable<IResponseModel>;
  REGEX_EMAIL = REGEX_EMAIL;
  PHONE_REGEX = PHONE_REGEX;

  constructor(private _toastrService: ToastrService) {
    this.clienQuoteEmail$ = this.#store.select(
      fromClientDetailsSelector.EmailSelector
    );
    this.clientQuoteFirstName$ = this.#store.select(
      fromClientDetailsSelector.FnameSelector
    );
    this.clienQuoteLastName$ = this.#store.select(
      fromClientDetailsSelector.LnameSelector
    );
    this.clientQuotePhoneNumber$ = this.#store.select(
      fromClientDetailsSelector.PhoneSelector
    );
    this.clientQuoteAddress$ = this.#store.select(
      fromClientDetailsSelector.AddressSelector
    );

    this.clientQuoteHseNumber$ = this.#store.select(
      fromClientDetailsSelector.HseNumberSelector
    );

    this.clientQuoteServiceType$ = this.#store.select(
      fromClientDetailsSelector.ServiceTypeSelector
    );

    this.counties$ = this.#store.select(fromCountySelector.ListCounties);
    this.selected_county$ = this.#store.select(
      fromCountySelector.SelectedCounty
    );
    this.selected_constituency$ = this.#store.select(
      fromCountySelector.SelectedConstituency
    );
    this.selected_ward$ = this.#store.select(fromCountySelector.SelectedWard);
    this.isLoadingCounties$ = this.#store.select(
      fromCountySelector.LoadingStatus
    );
    this.#countyFetchResponse$ = this.#store.select(
      fromCountySelector.SelectResponse
    );
  }
  /**
   * onInputEvent
   * @param $event
   * @param key
   */
  onInputEvent($event: any, key: string) {
    const input = $event.target.value;
    switch (key) {
      case 'email':
        this.#store.dispatch(
          fromClientDetailsActions.ClientDataInput.email({ input })
        );
        break;
      case 'fname':
        this.#store.dispatch(
          fromClientDetailsActions.ClientDataInput.fname({ input })
        );
        break;
      case 'lname':
        this.#store.dispatch(
          fromClientDetailsActions.ClientDataInput.lname({ input })
        );
        break;
      case 'address':
        this.#store.dispatch(
          fromClientDetailsActions.ClientDataInput.address({ input })
        );
        break;
      case 'hseNumber':
        this.#store.dispatch(
          fromClientDetailsActions.ClientDataInput.hseNumber({ input })
        );
        break;
      case 'phone':
        this.#store.dispatch(
          fromClientDetailsActions.ClientDataInput.phone({ input })
        );
        break;
      case 'servicyType':
        this.#store.dispatch(
          fromClientDetailsActions.ClientDataInput.serviceType({ input })
        );
        break;
      default:
        break;
    }
    this._setClientDataEmit();
  }
  public async fetchCountiesData() {
    const existingCounties = await firstValueFrom(this.counties$);
    const response = await firstValueFrom(this.#countyFetchResponse$);
    if (existingCounties.length) {
      return;
    }
    this.#store.dispatch(
      fromCountyActions.CountyPicker.list({
        url: `${BASE_API}/${KENYA_COUNTIES}`,
      })
    );
    if (!response.success && response.message) {
      this._toastrService.error(
        response.message,
        'Something happened, please try again',
        {
          positionClass: 'toast-top-right',
        }
      );
    }
  }
  /**
   * onCountySelect
   * @param event
   */
  public async onCountySelect(event: any) {
    const counties = await firstValueFrom(this.counties$);
    const selected = counties.find(
      (c) => c.countyCode.toString() === event.target.value
    );
    if (selected) {
      this.#store.dispatch(
        fromCountyActions.CountyPicker.county({
          selected,
        })
      );
    }
    this.selected_county$ = this.#store.select(
      fromCountySelector.SelectedCounty
    );
    this._setClientDataEmit();
  }
  /**
   * onConstituencyChange
   * @param event
   */
  public async onConstituencyChange(event: any) {
    const name = event.target.value;
    const constituencies = (await firstValueFrom(this.selected_county$))
      .constituencies;
    if (constituencies) {
      const selected = constituencies.find((c) => c.name === name);
      if (selected) {
        this.#store.dispatch(
          fromCountyActions.ConstituencyPicker.constituency({ selected })
        );
      }
      this._setClientDataEmit();
    }
  }
  /**
   * onWardChange
   * @param event
   */
  public async onWardChange(event: any) {
    const name = event.target.value;
    const wards = (await firstValueFrom(this.selected_constituency$)).wards;
    if (wards) {
      const selected = wards.find((w) => w === name);
      if (selected) {
        this.#store.dispatch(
          fromCountyActions.WardPicker.selected_ward({ selected })
        );
      }
    }
    this._setClientDataEmit();
  }

  private async _setClientDataEmit() {
    const data = {
      email: await firstValueFrom(this.clienQuoteEmail$),
      fname: await firstValueFrom(this.clientQuoteFirstName$),
      lname: await firstValueFrom(this.clienQuoteLastName$),
      address: await firstValueFrom(this.clientQuoteAddress$),
      phone: await firstValueFrom(this.clientQuotePhoneNumber$),
      hseNumber: await firstValueFrom(this.clientQuoteHseNumber$),
      county: (await firstValueFrom(this.selected_county$)).name,
      constituency: (await firstValueFrom(this.selected_constituency$)).name,
      ward: await firstValueFrom(this.selected_ward$),
      serviceType: await firstValueFrom(this.clientQuoteServiceType$),
    };
    this.clientData$.emit(data);
  }
}
