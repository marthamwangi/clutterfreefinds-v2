import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
  inject,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { QuoteServiceComponent } from './client/sections/quote-service/quote-service.component';
import {
  AppState,
  ICffService,
} from './client/sections/quote-service/model/cffSservice.model';
import { QuoteSpaceComponent } from './client/sections/quote-space/quote-space.component';
import { ISpaceModel } from './models/space.model';
import { QuoteProductComponent } from './client/sections/quote-product/quote-product.component';
import { IMaterialModel } from './models/material.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { AsyncPipe, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { QuoteAdditonalInfoComponent } from './client/sections/quote-additonal-info/quote-additonal-info.component';
import { QuoteCalendarComponent } from './client/sections/quote-calendar/quote-calendar.component';
import { QuoteClientDetailsComponent } from './client/sections/quote-client-details/quote-client-details.component';
import { Store } from '@ngrx/store';
import { BASE_API, WEB_API_CFF_SERVICES } from '@clutterfreefinds-v2/globals';
import { fromCffServiceActions } from './client/sections/quote-service/data/quote-service.actions';
import { fromCffServiceSelectors } from './client/sections/quote-service/data/quote-service.selectors';

interface IPriceRange {
  minPrice: number;
  maxPrice: number;
}

interface Step {
  label: number;
  key: string;
  title: string;
  status: 'active' | 'disabled' | 'completed' | 'active-and-completed';
}
@Component({
  selector: 'iq-instant-quote',
  standalone: true,
  imports: [
    TranslateModule,
    ReactiveFormsModule,
    QuoteServiceComponent,
    QuoteSpaceComponent,
    QuoteProductComponent,
    QuoteAdditonalInfoComponent,
    QuoteCalendarComponent,
    QuoteClientDetailsComponent,
    NgIf,
    NgTemplateOutlet,
    NgFor,
    AsyncPipe,
  ],
  templateUrl: './instant-quote.component.html',
  styleUrls: ['./instant-quote.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InstantQuoteComponent implements OnInit, AfterViewInit {
  @ViewChild('iqCalendar') private iqCalendarRef!: TemplateRef<any>;
  @ViewChild('iqEstimates') private iqEstimatesRef!: TemplateRef<any>;
  @ViewChild('iqClientDetails') private iqClientDetailsRef!: TemplateRef<any>;
  @ViewChild('iqQuoteSummary') private iqQuoteSummaryRef!: TemplateRef<any>;
  private _changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);

  private store: Store<AppState> = inject(Store);

  public steps!: { [step: number]: Step };

  private _priceCalculator$: BehaviorSubject<IPriceRange> =
    new BehaviorSubject<IPriceRange>({
      minPrice: 0,
      maxPrice: 0,
    });
  public renderedSteps: Array<Step>;
  public currentStepIndex: number;
  public currentStep: Step | null = null;

  public serviceSelected!: ICffService;
  public isServiceSelected$: Observable<boolean | undefined>;

  public spaceSelected!: ISpaceModel;
  public _selectedMaterial!: IMaterialModel;
  public _selectedQuoteDate!: any;

  public minPrice!: string;
  public maxPrice!: string;

  public createInstantQuote: FormGroup = new FormGroup({
    date: new FormControl('', Validators.required),
    estimates: new FormGroup({
      service: new FormControl('', Validators.required),
      space: new FormControl('', Validators.required),
      material: new FormControl(''),
      notes: new FormControl(''),
      images: new FormControl(''),
    }),
    clientDetails: new FormControl('', Validators.required),
  });
  constructor() {
    this.isServiceSelected$ = this.store.select(
      fromCffServiceSelectors.selectActiveServiceStatus
    );
    this.renderedSteps = [];
    this.currentStepIndex = 0;
    this.steps = {
      0: {
        key: 'date',
        label: 1,
        title: 'Book a Date',
        status: 'active',
      },
      1: {
        key: 'estimates',
        label: 2,
        title: 'Set your preferences',
        status: 'disabled',
      },
      2: {
        key: 'clientDetails',
        label: 3,
        title: 'Service address',
        status: 'disabled',
      },
      3: {
        key: 'quoteSummary',
        label: 4,
        title: 'Quote Summary',
        status: 'disabled',
      },
    };
  }
  ngAfterViewInit(): void {
    this._createRenderedSteps();
    this._commonChangeDetector();
  }
  ngOnInit() {
    this.store.dispatch(
      fromCffServiceActions.getCffServicesFromBE({
        url: `${BASE_API}/${WEB_API_CFF_SERVICES}`,
      })
    );
    this._priceCalculator$.pipe().subscribe({
      next: (price: any) => {
        this.minPrice = this._formatPriceToString(price.minPrice);
        this.maxPrice = this._formatPriceToString(price.maxPrice);
      },
    });
  }
  //onDestroy to take until unsubscribe
  public _commonChangeDetector(): void {
    this._changeDetectorRef.detectChanges();
  }
  private _createRenderedSteps() {
    for (const key in this.steps) {
      this.renderedSteps.push(this.steps[key]);
      if (this.currentStepIndex === parseInt(key)) {
        this.currentStep = this.renderedSteps[this.currentStepIndex];
        this.currentStep.status = 'active';
      }
    }
  }
  public returnStepsTemplate(): TemplateRef<any> {
    const templateMap: any = {
      0: this.iqCalendarRef,
      1: this.iqEstimatesRef,
      2: this.iqClientDetailsRef,
      3: this.iqQuoteSummaryRef,
    };
    return templateMap[this.currentStepIndex];
  }
  getQuoteDate($event: any): void {
    this._selectedQuoteDate = $event;
    this._updateInstantQuoteForm({ date: $event });
  }
  getService($event: ICffService): void {
    this.serviceSelected = $event;
    this._calculatePriceServiceRange($event, 1);
  }

  getSpace($event: ISpaceModel): void {
    this.spaceSelected = $event;
    this._calculatePriceSpaceRange($event);
    this._setNestedFormGroup(
      { service: this.serviceSelected.id },
      { space: $event.id }
    );
  }

  getMaterial($event: IMaterialModel) {
    this._resetPrices();
    this._selectedMaterial = $event;
    this._calculatePriceMAterialRange($event);
  }

  private _calculatePriceServiceRange(service: ICffService, hours: number) {
    const minPrice = service.price * hours;
    const maxPrice = service.price * hours;
    this._priceCalculator$.next({
      minPrice: minPrice,
      maxPrice: maxPrice,
    });
  }

  private _calculatePriceSpaceRange(space: ISpaceModel) {
    const minPrice = space.minHours * this.serviceSelected.price;
    const maxPrice = space.maxHours * this.serviceSelected.price;
    this._priceCalculator$.next({
      minPrice: minPrice,
      maxPrice: maxPrice,
    });
  }

  private _calculatePriceMAterialRange(material: IMaterialModel) {
    if (material.percentagePrice > 1) {
      const minPrice =
        ((100 + material.percentagePrice) *
          (this.spaceSelected.minHours * this.serviceSelected.price)) /
        100;
      const maxPrice =
        ((100 + material.percentagePrice) *
          (this.spaceSelected.maxHours * this.serviceSelected.price)) /
        100;
      this._priceCalculator$.next({
        minPrice: minPrice,
        maxPrice: maxPrice,
      });
    } else {
      this._resetPrices();
    }
  }

  private _resetPrices() {
    const minPrice = this.spaceSelected.minHours * this.serviceSelected.price;
    const maxPrice = this.spaceSelected.maxHours * this.serviceSelected.price;
    this._priceCalculator$.next({
      minPrice: minPrice,
      maxPrice: maxPrice,
    });
  }

  private _formatPriceToString(price: number) {
    return Intl.NumberFormat('KES', {
      style: 'currency',
      currency: 'KES',
    }).format(price);
  }

  goToNext() {
    if (this.currentStepIndex === this.renderedSteps.length - 1) {
      return;
    }
    this.currentStepIndex = this.currentStepIndex + 1;
    this.renderedSteps.forEach((step, index) => {
      if (index === this.currentStepIndex) {
        step.status = 'active';
        this.currentStep = step;
      } else if (index < this.currentStepIndex) {
        step.status = 'completed';
        this.currentStep = step;
      } else {
        step.status = 'disabled';
        this.currentStep = step;
      }
    });
  }
  goBack() {
    if (this.currentStepIndex === this.renderedSteps.length) {
      return;
    }
    this.currentStepIndex -= 1;
    this.renderedSteps.forEach((step, index) => {
      if (index === this.currentStepIndex) {
        step.status = 'active';
        this.currentStep = step;
      } else if (index < this.currentStepIndex) {
        step.status = 'completed';
        this.currentStep = step;
      } else {
        step.status = 'disabled';
        this.currentStep = step;
      }
    });
  }

  private _updateInstantQuoteForm(paylod: { [key: string]: any }): void {
    this.createInstantQuote.patchValue(paylod);
    console.log('fomm', this.createInstantQuote.value);
  }

  instantQuoteForm(key: any): any {
    return this.createInstantQuote.get(key);
  }

  get estimates(): any {
    return this.createInstantQuote.get('estimates');
  }
  get clientDetails(): any {
    return this.createInstantQuote.get('clientDetails');
  }
  private _setNestedFormGroup(
    service: { service: string },
    space: { space: string }
  ): void {
    this.estimates.patchValue({
      service: service,
      space: space,
    });
  }
}
