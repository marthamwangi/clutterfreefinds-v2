import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  inject,
} from '@angular/core';
import { AsyncPipe, NgFor } from '@angular/common';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { fromCffServiceSelectors } from './data/quote-service.selectors';
import { fromCffServiceActions } from './data/quote-service.actions';
import { AppState } from 'apps/website/mfe/src/app/shared/interface';
import { ICffService } from './model/cffSservice.model';
@Component({
  selector: 'iq-quote-service',
  standalone: true,
  imports: [NgFor, MatTooltipModule, AsyncPipe, FormsModule],

  templateUrl: './quote-service.component.html',
  styleUrls: ['./quote-service.component.scss'],
})
export class QuoteServiceComponent {
  protected store: Store<AppState> = inject(Store);
  @Output() selectedService$ = new EventEmitter<ICffService>();
  @Input() selectedCffService!: ICffService;
  @ViewChild('tooltipRef', { static: false })
  private _tooltipRef!: MatTooltip;
  private _cff_services$: Observable<Array<ICffService>>;
  public cffServicesProgress: boolean = false;
  public cffServices: Array<ICffService> = [];
  public cffServiceTooltip$: BehaviorSubject<any>;

  constructor() {
    this._cff_services$ = this.store.select(
      fromCffServiceSelectors.selectServiceList
    );
    this.cffServiceTooltip$ = new BehaviorSubject('');
  }
  ngOnInit() {
    this._getCffServices();
  }
  private _getCffServices(): void {
    this._cff_services$.subscribe((data: Array<ICffService>) => {
      // this.cffServices = this._returnShallowCopy(data);
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
