import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
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
import { QuoteServiceComponent } from '../client/sections/quote-service/quote-service.component';

import { QuoteSpaceComponent } from '../client/sections/quote-space/quote-space.component';
import { Observable } from 'rxjs';
import {
  AsyncPipe,
  CurrencyPipe,
  NgFor,
  NgIf,
  NgTemplateOutlet,
} from '@angular/common';
import { QuoteAdditonalInfoComponent } from '../client/sections/quote-additonal-info/quote-additonal-info.component';
import { QuoteCalendarComponent } from '../client/sections/quote-calendar/quote-calendar.component';
import { QuoteClientDetailsComponent } from '../client/sections/quote-client-details/quote-client-details.component';
import { QuoteMaterialComponent } from '../client/sections/quote-material/quote-material.component';
import { QuoteSummaryComponent } from '../client/sections/quote-summary-options/quote-summary.component';
import { Store } from '@ngrx/store';
import { AppState, REGEX_EMAIL } from '@clutterfreefinds-v2/globals';
import { fromInstantQuoteSelector } from './data/quote.selectors';
import { fromInstantQuoteActions } from './data/quote.actions';
import { ICffService } from '../client/sections/quote-service/data/cffSservice.model';
import { ISpaceModel } from '../client/sections/quote-space/data/space.model';
import { IMaterialModel } from '../client/sections/quote-material/data/material.model';

interface Step {
  label: number;
  key: string;
  title: string;
  status: 'active' | 'disabled' | 'completed';
}

@Component({
  selector: 'iq-instant-quote',
  standalone: true,
  imports: [
    TranslateModule,
    ReactiveFormsModule,
    QuoteServiceComponent,
    QuoteSpaceComponent,
    QuoteMaterialComponent,
    QuoteAdditonalInfoComponent,
    QuoteCalendarComponent,
    QuoteClientDetailsComponent,
    QuoteSummaryComponent,
    NgIf,
    NgTemplateOutlet,
    NgFor,
    AsyncPipe,
    CurrencyPipe,
  ],
  templateUrl: './instant-quote.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InstantQuoteComponent implements AfterViewInit {
  @ViewChild('iqCalendar') private iqCalendarRef!: TemplateRef<any>;
  @ViewChild('iqEstimates') private iqEstimatesRef!: TemplateRef<any>;
  @ViewChild('iqClientDetails') private iqClientDetailsRef!: TemplateRef<any>;
  @ViewChild('iqQuoteSummary') private iqQuoteSummaryRef!: TemplateRef<any>;
  private _changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);
  #store: Store<AppState> = inject(Store);
  public steps!: { [step: number]: Step };

  public renderedSteps: Array<Step>;
  public currentStepIndex: number;
  public currentStep: Step | null = null;

  public serviceSelected!: ICffService;
  public spaceSelected!: ISpaceModel;
  public selectedMaterial!: IMaterialModel;
  public _selectedQuoteDate!: Date;
  public additionalInfo!: any;
  public clientData!: any;

  price_calculator$: Observable<{ max_price: number; min_price: number }>;

  public createInstantQuote: FormGroup = new FormGroup({
    date: new FormControl('', Validators.required),
    estimates: new FormGroup({
      service: new FormControl('', Validators.required),
      space: new FormControl('', Validators.required),
      material: new FormControl(''),
      notes: new FormControl(''),
      images: new FormControl([]),
      minPrice: new FormControl(),
      maxPrice: new FormControl(),
    }),
    clientDetails: new FormGroup({
      county: new FormControl('', Validators.required),
      constituency: new FormControl('', Validators.required),
      ward: new FormControl('', Validators.required),
      address: new FormControl(''),
      hseNumber: new FormControl(''),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern(REGEX_EMAIL),
      ]),
      fname: new FormControl('', [Validators.required]),
      lname: new FormControl(''),
      phone: new FormControl('', Validators.required),
      serviceType: new FormControl('', Validators.required),
    }),
  });
  constructor() {
    this.price_calculator$ = this.#store.select(
      fromInstantQuoteSelector.InstantQuoteSelector
    );
    this.renderedSteps = [];
    this.currentStepIndex = 0;
    this.steps = {
      0: {
        key: 'date',
        label: 1,
        title: 'Booking',
        status: 'active',
      },
      1: {
        key: 'estimates',
        label: 2,
        title: 'Preferences',
        status: 'disabled',
      },
      2: {
        key: 'clientDetails',
        label: 3,
        title: 'Address',
        status: 'disabled',
      },
      3: {
        key: 'quoteSummary',
        label: 4,
        title: 'Finish',
        status: 'disabled',
      },
    };
  }
  ngAfterViewInit(): void {
    this._createRenderedSteps();
    this._commonChangeDetector();
  }
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
    this._priceCalculator(); //why is this called here?
  }
  getService($event: ICffService): void {
    this.serviceSelected = $event;
    this._priceCalculator();
    this._updateInstantQuoteForm(
      this.estimates.patchValue({
        service: this.serviceSelected?.id,
      })
    );
  }
  getSpace($event: ISpaceModel): void {
    this.spaceSelected = $event;
    this._priceCalculator();
    this._updateInstantQuoteForm(
      this.estimates.patchValue({
        space: this.spaceSelected?.id,
      })
    );
  }
  getMaterial($event: IMaterialModel) {
    this.selectedMaterial = $event;
    this._priceCalculator();
    this._updateInstantQuoteForm(
      this.estimates.patchValue({
        material: this.selectedMaterial?.id,
      })
    );
  }
  getAdditionalInfo($event: any) {
    this.additionalInfo = $event;
    this._updateInstantQuoteForm(
      this.estimates.patchValue({
        images: this.additionalInfo?.images,
        notes: this.additionalInfo.notes,
      })
    );
  }
  getClientData($event: any) {
    this.clientData = $event;
    this._updateInstantQuoteForm(
      this.clientDetails.patchValue({
        email: this.clientData?.email,
        fname: this.clientData?.fname,
        lname: this.clientData?.lname,
        phone: this.clientData?.phone,
        address: this.clientData?.address,
        hseNumber: this.clientData?.hseNumber,
        county: this.clientData.county,
        constituency: this.clientData.constituency,
        ward: this.clientData.ward,
        serviceType: this.clientData.serviceType,
      })
    );
  }

  private _priceCalculator() {
    let min_price = 0;
    let max_price = 0;
    if (this.serviceSelected) {
      min_price = this.serviceSelected.price;
      max_price = this.serviceSelected.price;
      if (this.spaceSelected) {
        min_price = this.serviceSelected.price * this.spaceSelected.minHours;
        max_price = this.serviceSelected.price * this.spaceSelected.maxHours;
        if (this.selectedMaterial) {
          min_price =
            ((100 + this.selectedMaterial.percentagePrice) *
              (this.spaceSelected.minHours * this.serviceSelected.price)) /
            100;
          max_price =
            ((100 + this.selectedMaterial.percentagePrice) *
              (this.spaceSelected.maxHours * this.serviceSelected.price)) /
            100;
        }
      }
    }
    this.#store.dispatch(
      fromInstantQuoteActions.QuotePrice.data({
        min_price,
        max_price,
        service_date: this._selectedQuoteDate.toString(),
      })
    );
    this._updateInstantQuoteForm(
      this.estimates.patchValue({
        minPrice: min_price,
        maxPrice: max_price,
      })
    );
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
      } else if (
        index < this.currentStepIndex &&
        this.instantQuoteForm(this.steps[index].key)?.valid
      ) {
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
      } else if (
        index < this.currentStepIndex &&
        this.instantQuoteForm(this.steps[index].key)?.valid
      ) {
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
}
