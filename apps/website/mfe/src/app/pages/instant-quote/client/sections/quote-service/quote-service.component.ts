import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
  inject,
} from '@angular/core';
import { AsyncPipe, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import {
  BehaviorSubject,
  Observable,
  Subject,
  firstValueFrom,
  take,
  takeUntil,
} from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { fromCffServiceSelectors } from './data/quote-service.selectors';
import { fromCffServiceActions } from './data/quote-service.actions';
import { AppState } from '@clutterfreefinds-v2/globals';
import { ICffService } from './model/cffSservice.model';
import { BASE_API, WEB_API_CFF_SERVICES } from '@clutterfreefinds-v2/globals';
import { ToastrService } from 'ngx-toastr';
import { IResponseModel } from '@clutterfreefinds-v2/globals';
import { initAccordions } from 'flowbite';
@Component({
  selector: 'iq-quote-service',
  standalone: true,
  imports: [NgFor, AsyncPipe, FormsModule, NgTemplateOutlet, NgIf],

  templateUrl: './quote-service.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuoteServiceComponent implements OnInit, OnDestroy {
  private store: Store<AppState> = inject(Store);
  private _changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);

  @Output() selectedService$ = new EventEmitter<ICffService>();
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
  private _response$: Observable<IResponseModel>;

  public loadStatus!: number;

  constructor(private _toastrService: ToastrService) {
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

    this._response$ = this.store.select(fromCffServiceSelectors.selectResponse);
    this.cffServiceTooltip$ = new BehaviorSubject('');
  }
  ngOnInit() {
    this._renderServices();
    this._setSelectedService();
    this._listenForLoadingStatus();
    initAccordions();
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
    this._service_selected$.subscribe({
      next: (service) => {
        this.selectedCffService = service;
      },
    });
  }
  public async loadServices() {
    const existingServices = await firstValueFrom(this._cff_services$);
    const response = await firstValueFrom(this._response$);
    if (existingServices.length) {
      return;
    }
    this.store.dispatch(
      fromCffServiceActions.getCffServicesFromBE({
        url: `${BASE_API}/${WEB_API_CFF_SERVICES}`,
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

  private _renderServices() {
    this._cff_services$.subscribe((data: Array<ICffService>) => {
      this.cffServices = data;
    });
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
