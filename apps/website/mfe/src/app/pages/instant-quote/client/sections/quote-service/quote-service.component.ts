import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { CFFServices } from '../../services/quote-service.service';
import { BASE_API, WEB_API_CFF_SERVICES } from '@clutterfreefinds-v2/globals';
import { AsyncPipe, NgFor } from '@angular/common';
import { ICffService } from '../../../models/cffSservice.model';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';
import { BehaviorSubject, take } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'iq-quote-service',
  standalone: true,
  imports: [NgFor, MatTooltipModule, AsyncPipe, FormsModule],

  templateUrl: './quote-service.component.html',
  styleUrls: ['./quote-service.component.scss'],
})
export class QuoteServiceComponent {
  @Output() selectedService$ = new EventEmitter<ICffService>();
  @ViewChild('tooltipRef', { static: false })
  private _tooltipRef!: MatTooltip;

  public cffServicesProgress: boolean = false;
  public cffServices: Array<ICffService> = [];
  public cffServiceTooltip$: BehaviorSubject<any>;

  public selectedCffService$: BehaviorSubject<ICffService>;
  public selectedCffService!: ICffService;
  constructor(private _cffServices: CFFServices) {
    this.cffServiceTooltip$ = new BehaviorSubject('');
    this.selectedCffService$ = new BehaviorSubject<ICffService>({
      name: '',
      price: 0,
      description: '',
      label: '',
      isSelected: false,
    });
    this.selectedCffService$.subscribe({
      next: (service) => {
        this.selectedCffService = service;
      },
    });
  }
  ngOnInit() {
    this.getCffServices();
  }
  private getCffServices(): void {
    this.cffServicesProgress = true;
    this._cffServices
      .getCffServices(`${BASE_API}/${WEB_API_CFF_SERVICES}`)
      .subscribe({
        next: (response: any) => {
          this.cffServicesProgress = false;
          if (response.success) {
            this.cffServices = response.services;
          }
        },
        error: (error: any) => {
          this.cffServicesProgress = false;
        },
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

  public selectedService(service: ICffService) {
    service.isSelected = true;
    this.selectedCffService$.next(service);

    this.selectedService$.emit(service);
  }
}
