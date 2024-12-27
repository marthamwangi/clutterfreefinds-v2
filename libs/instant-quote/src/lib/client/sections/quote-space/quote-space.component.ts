import { NgFor, AsyncPipe, NgTemplateOutlet, NgIf } from '@angular/common';
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
import { FormsModule } from '@angular/forms';
import { Observable, Subject, firstValueFrom, takeUntil } from 'rxjs';
import { AppState } from '@clutterfreefinds-v2/globals';
import { Store } from '@ngrx/store';
import { fromSpaceSelectors } from './data/quote-space.selectors';
import { fromCffSpacesActions } from './data/quote-space.actions';
import { BASE_API, WEB_API_CFF_SPACE } from '@clutterfreefinds-v2/globals';
import { fromCffServiceSelectors } from '../quote-service/data/quote-service.selectors';
import { IResponseModel } from '@clutterfreefinds-v2/globals';
import { ToastrService } from 'ngx-toastr';
import { ISpaceModel } from './data/space.model';
import { ICffService } from '../quote-service/data/cffSservice.model';

@Component({
  selector: 'iq-quote-space',
  standalone: true,
  imports: [NgFor, AsyncPipe, FormsModule, NgTemplateOutlet, AsyncPipe, NgIf],
  templateUrl: './quote-space.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuoteSpaceComponent implements OnInit, OnDestroy {
  @Output() selectedSpaceEmit$ = new EventEmitter<ISpaceModel>();
  @ViewChild('loadingRef')
  private _loadingRef!: TemplateRef<any>;
  @ViewChild('loadedRef')
  private _loadedRef!: TemplateRef<any>;

  private _changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);

  public selectedCffSpace!: ISpaceModel;

  private store: Store<AppState> = inject(Store);

  private _cff_spaces$: Observable<Array<ISpaceModel>>;
  private _space_selected$: Observable<ISpaceModel>;

  public _service_selected$: Observable<ICffService>;

  public spacesArr: Array<ISpaceModel> = [];

  public selectedSpace!: ISpaceModel;

  private _unsubscribe$: Subject<boolean>;
  private _loadProgress$: Observable<boolean>;
  public loadStatus!: number;

  private _response$: Observable<IResponseModel>;

  constructor(private _toastrService: ToastrService) {
    this._loadProgress$ = this.store.select(
      fromSpaceSelectors.selectLoadingList
    );

    this._unsubscribe$ = new Subject<boolean>();

    this._cff_spaces$ = this.store.select(fromSpaceSelectors.selectSepacesList);

    this._space_selected$ = this.store.select(
      fromSpaceSelectors.selectedSpaceSelector
    );

    this._service_selected$ = this.store.select(
      fromCffServiceSelectors.selectActiveService
    );
    this._response$ = this.store.select(fromSpaceSelectors.selectResponse);
  }

  ngOnInit() {
    this._setSelected();
    this._renderAllSpaces();
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

  private _setSelected() {
    this._space_selected$.subscribe((space) => {
      this.selectedCffSpace = space;
    });
  }

  public async loadSpaces() {
    const existingSpaces = await firstValueFrom(this._cff_spaces$);
    const response = await firstValueFrom(this._response$);
    if (existingSpaces.length) {
      return;
    }
    this.store.dispatch(
      fromCffSpacesActions.getCffSpacesFromBE({
        url: `${BASE_API}/${WEB_API_CFF_SPACE}`,
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
  private _renderAllSpaces() {
    this._cff_spaces$.subscribe((data: Array<ISpaceModel>) => {
      this.spacesArr = data;
    });
  }

  public fnSelectSpace(space: ISpaceModel) {
    this.store.dispatch(
      fromCffSpacesActions.setSelectedService({
        selected_space: space,
      })
    );
    this.selectedSpaceEmit$.emit(space);
  }
}
