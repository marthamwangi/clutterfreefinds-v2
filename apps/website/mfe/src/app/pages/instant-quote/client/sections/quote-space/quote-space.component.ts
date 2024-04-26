import { NgFor, AsyncPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ISpaceModel } from './models/space.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppState } from 'apps/website/mfe/src/app/shared/interface';
import { Store } from '@ngrx/store';
import { fromSpaceSelectors } from './data/quote-space.selectors';
import { fromCffSpacesActions } from './data/quote-space.actions';
import { BASE_API, WEB_API_CFF_SPACE } from '@clutterfreefinds-v2/globals';
import { ICffService } from '../quote-service/model/cffSservice.model';
import { fromCffServiceSelectors } from '../quote-service/data/quote-service.selectors';

@Component({
  selector: 'iq-quote-space',
  standalone: true,
  imports: [NgFor, AsyncPipe, FormsModule],
  templateUrl: './quote-space.component.html',
  styleUrls: ['./quote-space.component.scss'],
})
export class QuoteSpaceComponent {
  @Output() selectedSpaceEmit$ = new EventEmitter<ISpaceModel>();

  public isServiceSelected!: ICffService;
  public selectedCffSpace!: ISpaceModel;

  private store: Store<AppState> = inject(Store);

  private _cff_spaces$: Observable<Array<ISpaceModel>>;
  private _space_selected$: Observable<ISpaceModel>;

  private _service_selected$: Observable<ICffService>;

  public spaceProgress: boolean = false;
  public spacesArr: Array<ISpaceModel> = [];

  public selectedSpace!: ISpaceModel;

  constructor() {
    this._cff_spaces$ = this.store.select(fromSpaceSelectors.selectSepacesList);

    this._space_selected$ = this.store.select(
      fromSpaceSelectors.selectedSpaceSelector
    );

    this._service_selected$ = this.store.select(
      fromCffServiceSelectors.selectActiveService
    );
  }

  ngOnInit() {
    this._setSelected();
    this._renderAllSpaces();
  }

  private _setSelected() {
    this._space_selected$.subscribe((space) => {
      this.selectedCffSpace = space;
    });

    this._service_selected$.subscribe((service) => {
      this.isServiceSelected = service;
    });
  }

  public loadSpaces(): void {
    this.store.dispatch(
      fromCffSpacesActions.getCffSpacesFromBE({
        url: `${BASE_API}/${WEB_API_CFF_SPACE}`,
      })
    );
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
