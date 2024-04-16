import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  SimpleChange,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { QuoteServiceComponent } from './client/sections/quote-service/quote-service.component';
import { ICffService } from './models/cffSservice.model';
import { QuoteSpaceComponent } from './client/sections/quote-space/quote-space.component';
import { ISpaceModel } from './models/space.model';
import { QuoteProductComponent } from './client/sections/quote-product/quote-product.component';
import { IMaterialModel } from './models/material.model';
import { BehaviorSubject } from 'rxjs';
import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { QuoteAdditonalInfoComponent } from './client/sections/quote-additonal-info/quote-additonal-info.component';
import { QuoteCalendarComponent } from './client/sections/quote-calendar/quote-calendar.component';
import { QuoteClientDetailsComponent } from './client/sections/quote-client-details/quote-client-details.component';
interface IPriceRange {
  minPrice: number;
  maxPrice: number;
}

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
    QuoteProductComponent,
    QuoteAdditonalInfoComponent,
    QuoteCalendarComponent,
    QuoteClientDetailsComponent,
    NgIf,
    NgTemplateOutlet,
    NgFor,
  ],
  templateUrl: './instant-quote.component.html',
  styleUrls: ['./instant-quote.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InstantQuoteComponent implements OnInit, AfterViewInit {
  @ViewChild('iqCalendar') private iqCalendarRef!: TemplateRef<any>;
  @ViewChild('iqEstimates') private iqEstimatesRef!: TemplateRef<any>;
  @ViewChild('iqClientDetails') private iqClientDetailsRef!: TemplateRef<any>;
  @ViewChild('iqServiceType') private iqServiceTypeRef!: TemplateRef<any>;
  @ViewChild('iqQuoteSummary') private iqQuoteSummaryRef!: TemplateRef<any>;
  public steps!: { [step: number]: Step };

  private _priceCalculator$: BehaviorSubject<IPriceRange> =
    new BehaviorSubject<IPriceRange>({
      minPrice: 0,
      maxPrice: 0,
    });
  public renderedSteps: Array<Step>;
  public currentStep: number;

  private _serviceSelected!: ICffService;
  public spaceSelected!: ISpaceModel;
  public _selectedMaterial!: IMaterialModel;

  public minPrice!: string;
  public maxPrice!: string;
  constructor(private _changeDetectorRef: ChangeDetectorRef) {
    this.renderedSteps = [];
    this.currentStep = 0;
    this.steps = {
      0: {
        key: 'datePicker',
        label: 1,
        title: 'Book a Date',
        status: 'active',
      },
      1: {
        key: 'preferences',
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
        key: 'serviceType',
        label: 4,
        title: 'Service method',
        status: 'disabled',
      },
      4: {
        key: 'quoteSummary',
        label: 5,
        title: 'Quote Summary',
        status: 'disabled',
      },
    };
  }
  ngOnInit() {
    this._priceCalculator$.pipe().subscribe({
      next: (price: any) => {
        this.minPrice = this._formatPriceToString(price.minPrice);
        this.maxPrice = this._formatPriceToString(price.maxPrice);
      },
    });
  }
  //onDestroy to take until unsubscribe
  ngAfterViewInit(): void {
    this._createRenderedSteps();
    this._changeDetectorRef.detectChanges();
  }
  private _createRenderedSteps() {
    for (const key in this.steps) {
      this.renderedSteps.push(this.steps[key]);
    }
  }
  public returnStepsTeplate(): TemplateRef<any> {
    const templateMap: any = {
      0: this.iqCalendarRef,
      1: this.iqEstimatesRef,
      2: this.iqClientDetailsRef,
      3: this.iqServiceTypeRef,
      4: this.iqQuoteSummaryRef,
    };
    return templateMap[this.currentStep];
  }
  getService($event: ICffService): void {
    this._serviceSelected = $event;
    this._calculatePriceServiceRange($event, 1);
  }

  getSpace($event: ISpaceModel): void {
    this.spaceSelected = $event;
    this._calculatePriceSpaceRange($event);
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
    const minPrice = space.minHours * this._serviceSelected.price;
    const maxPrice = space.maxHours * this._serviceSelected.price;
    this._priceCalculator$.next({
      minPrice: minPrice,
      maxPrice: maxPrice,
    });
  }

  private _calculatePriceMAterialRange(material: IMaterialModel) {
    if (material.percentagePrice > 1) {
      const minPrice =
        ((100 + material.percentagePrice) *
          (this.spaceSelected.minHours * this._serviceSelected.price)) /
        100;
      const maxPrice =
        ((100 + material.percentagePrice) *
          (this.spaceSelected.maxHours * this._serviceSelected.price)) /
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
    const minPrice = this.spaceSelected.minHours * this._serviceSelected.price;
    const maxPrice = this.spaceSelected.maxHours * this._serviceSelected.price;
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
}
