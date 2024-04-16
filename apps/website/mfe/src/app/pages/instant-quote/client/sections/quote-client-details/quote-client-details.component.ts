import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { CountyService } from '../../services/county.service';
import { BASE_API, KENYA_COUNTIES } from '@clutterfreefinds-v2/globals';
import { IConstituencyModel, ICountyModel } from '../../../models/county.model';
import { FormsModule } from '@angular/forms';
import { AsyncPipe, NgFor } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'iq-quote-client-details',
  standalone: true,
  imports: [FormsModule, NgFor, AsyncPipe],
  templateUrl: './quote-client-details.component.html',
  styleUrls: ['./quote-client-details.component.scss'],
})
export class QuoteClientDetailsComponent implements OnInit {
  public selectedCounty$: BehaviorSubject<ICountyModel | undefined> =
    new BehaviorSubject<ICountyModel | undefined>(undefined);

  public counties: Array<ICountyModel> | undefined = [];

  public selectedConstituency$: BehaviorSubject<
    IConstituencyModel | undefined
  > = new BehaviorSubject<IConstituencyModel | undefined>(undefined);

  public constituencies: Array<IConstituencyModel> | undefined = [];

  public selectedWard$: BehaviorSubject<string | undefined> =
    new BehaviorSubject<string | undefined>(undefined);

  public wards: Array<string> | undefined = [];

  constructor(private _countyService: CountyService) {}
  ngOnInit() {
    this._fetchCountiesData();
  }

  private _fetchCountiesData(): void {
    this._countyService
      .fetchCountiesData(`${BASE_API}/${KENYA_COUNTIES}`)
      .subscribe({
        next: (response) => {
          this.counties = this._sortAlphabetically(response.counties);
          if (this.counties) {
            const defaultCounty = this.counties[0];
            this.selectedCounty$.next(defaultCounty);
          }
        },
      });
  }

  public onCountySelect(event: any) {
    const countyCode = event.target.value;
    const county = this.counties?.find(
      (element) => element.countyCode === parseInt(countyCode)
    );
    this.selectedCounty$.next(county);
    this.selectedConstituency$.next(county?.constituencies[0]);
    this.constituencies = this._sortAlphabetically(county?.constituencies);
  }

  public onConstituencyChange(event: any) {
    const name = (event = event.target.value);
    console.log('event.name', event);
    const constituency = this.constituencies?.find(
      (element: IConstituencyModel) => {
        element.name.toUpperCase() === name.toUpperCase();
      }
      //selecting county not working correwctly
    );
    console.log('constituency', constituency);

    this.selectedConstituency$.next(constituency);
    this.selectedWard$.next(constituency?.wards[0]);
    this.wards = constituency?.wards;
  }

  public onWardChange(event: any) {
    event = event.target.value;
    const ward = this.wards?.find((element) => element === event.toString());
    this.selectedWard$.next(ward);
  }

  private _sortAlphabetically(items: any): any {
    const sortedItems = items.sort((a: any, b: any) => {
      if (a.name.toUpperCase() > b.name.toUpperCase()) {
        return 1;
      } else {
        return -1;
      }
    });
    return sortedItems;
  }
}
