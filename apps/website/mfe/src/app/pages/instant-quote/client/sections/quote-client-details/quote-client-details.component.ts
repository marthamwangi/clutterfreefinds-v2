import { Component, inject } from '@angular/core';
import { BASE_API, KENYA_COUNTIES } from '@clutterfreefinds-v2/globals';
import {
  IConstituencyModel,
  ICountyModel,
} from '../../../../../shared/models/county.model';
import { FormsModule } from '@angular/forms';
import { AsyncPipe, NgFor } from '@angular/common';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';
import { AppState } from 'apps/website/mfe/src/app/shared/interface';
import { Store } from '@ngrx/store';
import { fromCountyActions } from 'apps/website/mfe/src/app/shared/data/county/county.actions';
import { fromCountySelector } from 'apps/website/mfe/src/app/shared/data/county/county.selectors';
import { SortPipe } from '@clutterfreefinds/sort_pipe';

@Component({
  selector: 'iq-quote-client-details',
  standalone: true,
  imports: [FormsModule, NgFor, AsyncPipe, SortPipe],
  templateUrl: './quote-client-details.component.html',
  styleUrls: ['./quote-client-details.component.scss'],
})
export class QuoteClientDetailsComponent {
  #store: Store<AppState> = inject(Store);
  counties$!: Observable<Array<ICountyModel>>;
  selected_county$!: Observable<ICountyModel>;
  selected_constituency$!: Observable<IConstituencyModel>;
  selected_ward$!: Observable<string>;

  public async fetchCountiesData() {
    this.counties$ = this.#store.select(fromCountySelector.ListCounties);
    const existingCounties = await firstValueFrom(this.counties$);
    if (existingCounties.length) {
      return;
    }
    this.#store.dispatch(
      fromCountyActions.CountyPicker.list({
        url: `${BASE_API}/${KENYA_COUNTIES}`,
      })
    );
  }

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
  }

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
    }
    this.selected_constituency$ = this.#store.select(
      fromCountySelector.SelectedConstituency
    );
  }

  public async onWardChange(event: any) {
    const name = event.target.value;
    const wards = (await firstValueFrom(this.selected_constituency$)).wards;
    if (wards) {
      const selected = wards.find((w) => w === name);
      if (selected) {
        this.#store.dispatch(fromCountyActions.WardPicker.ward({ selected }));
        this.selected_ward$ = this.#store.select(
          fromCountySelector.SelectedWard
        );
      }
    }
  }
}
