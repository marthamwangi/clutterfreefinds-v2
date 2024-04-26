import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewChild,
  inject,
} from '@angular/core';
import { AsyncPipe, NgFor, NgTemplateOutlet } from '@angular/common';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';
import { BehaviorSubject, Observable, Subject, take, takeUntil } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { fromCffServiceSelectors } from './data/quote-service.selectors';
import { fromCffServiceActions } from './data/quote-service.actions';
import { AppState } from 'apps/website/mfe/src/app/shared/interface';
import { ICffService } from './model/cffSservice.model';
import { BASE_API, WEB_API_CFF_SERVICES } from '@clutterfreefinds-v2/globals';
@Component({
  selector: 'iq-quote-service',
  standalone: true,
  imports: [NgFor, MatTooltipModule, AsyncPipe, FormsModule, NgTemplateOutlet],

  templateUrl: './quote-service.component.html',
  styleUrls: ['./quote-service.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuoteServiceComponent {
  private store: Store<AppState> = inject(Store);
  private _changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);

  @Output() selectedService$ = new EventEmitter<ICffService>();
  @ViewChild('tooltipRef', { static: false })
  private _tooltipRef!: MatTooltip;
  @ViewChild('loadingRef')
  private _loadingRef!: TemplateRef<any>;
  @ViewChild('loadedRef')
  private _loadedRef!: TemplateRef<any>;
  private _unsubscribe$: Subject<boolean>;

  private _cff_services$: Observable<Array<ICffService>>;
  public cffServices: Array<ICffService> = [];
  public cffServiceTooltip$: BehaviorSubject<any>;
  private _service_selected$: Observable<ICffService>;
  public selectedCffService!: ICffService;
  private _loadProgress$: Observable<boolean>;
  public loadStatus!: number;

  constructor() {
    this._unsubscribe$ = new Subject<boolean>();
    this._cff_services$ = this.store.select(
      fromCffServiceSelectors.selectServiceList
    );
    this._service_selected$ = this.store.select(
      fromCffServiceSelectors.selectActiveService
    );
    this._loadProgress$ = this.store.select(
      fromCffServiceSelectors.selectLoadingList
    );

    this.cffServiceTooltip$ = new BehaviorSubject('');
  }
  ngOnInit() {
    this._renderServices();
    this._setSelectedService();
    this._listenForLoadingStatus();
  }
  ngOnDestroy(): void {
    this._unsubscribe$.next(true);
    this._unsubscribe$.complete();
  }
  public _commonChangeDetector(): void {
    this._changeDetectorRef.detectChanges();
  }

  private _listenForLoadingStatus() {
    this._loadProgress$.pipe(takeUntil(this._unsubscribe$)).subscribe((l) => {
      if (l === true) {
        this.loadStatus = 1;
      } else {
        this.loadStatus = 0;
      }
      console.log('loadStatus', this.loadStatus);
      this._commonChangeDetector();
    });
  }

  public returnListTemplate(): TemplateRef<any> {
    const templateMap: any = {
      1: this._loadingRef,
      0: this._loadedRef,
    };
    return templateMap[this.loadStatus];
  }
  private _setSelectedService() {
    this._service_selected$.subscribe((service) => {
      this.selectedCffService = service;
    });
  }
  public loadServices(): void {
    this.store.dispatch(
      fromCffServiceActions.getCffServicesFromBE({
        url: `${BASE_API}/${WEB_API_CFF_SERVICES}`,
      })
    );
  }

  private _renderServices() {
    this._cff_services$.subscribe((data: Array<ICffService>) => {
      this.cffServices = data;
    });
  }

  public showCffServiceDescriptionTooltip(service: ICffService): void {
    this._tooltipRef.show();
    this.cffServiceTooltip$.next(service.description);
    this._tooltipRef._tooltipInstance
      ?.afterHidden()
      .pipe(take(1))
      .subscribe({
        complete: () => {
          this.resetTooltip();
        },
      });
  }

  public resetTooltip() {
    this._tooltipRef.hide();
    this.cffServiceTooltip$.next('');
  }

  public onSelectedService(service: ICffService) {
    this.store.dispatch(
      fromCffServiceActions.mutateSelectedServiceSelection({
        selected_service: service,
      })
    );
    this.selectedService$.emit(service);
  }
}
