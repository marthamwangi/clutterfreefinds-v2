import { NgFor, AsyncPipe, NgIf, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable, Subject, firstValueFrom, takeUntil } from 'rxjs';
import { RouterOutlet } from '@angular/router';
import { TabComponent } from './sections/tab/tab.component';
import { Store } from '@ngrx/store';
import { AppState } from '@clutterfreefinds-v2/globals';
import { fromMaterialSelectors } from './data/quote-material.selectors';
import { fromMaterialActions } from './data/quote-material.action';
import { BASE_API, WEB_API_CFF_MATERIAL } from '@clutterfreefinds-v2/globals';
import { fromSpaceSelectors } from '../quote-space/data/quote-space.selectors';
import { IResponseModel } from '@clutterfreefinds-v2/globals';
import { ToastrService } from 'ngx-toastr';
import { IMaterialModel } from './data/material.model';
import { ISpaceModel } from '../quote-space/data/space.model';

@Component({
  selector: 'iq-quote-material',
  standalone: true,
  imports: [
    RouterOutlet,
    NgFor,
    AsyncPipe,
    FormsModule,
    TabComponent,
    NgIf,
    NgTemplateOutlet,
  ],
  templateUrl: './quote-material.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuoteMaterialComponent implements OnInit {
  private store: Store<AppState> = inject(Store);
  private _changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);

  @Output() selectedMaterialEmit$ = new EventEmitter<IMaterialModel>();

  @ViewChild('loadingRef')
  private _loadingRef!: TemplateRef<any>;
  @ViewChild('loadedRef')
  private _loadedRef!: TemplateRef<any>;

  public materialSelected: IMaterialModel | undefined = undefined;

  allTabs: any;

  private _cff_materials$: Observable<Array<IMaterialModel>>;
  public _material_selected$: Observable<IMaterialModel>;
  public space_selected$: Observable<ISpaceModel>;

  public materialsArr: Array<IMaterialModel> = [];
  private _unsubscribe$: Subject<boolean>;
  private _loadProgress$: Observable<boolean>;
  public loadStatus!: number;
  private _response$: Observable<IResponseModel>;

  constructor(private _toastrService: ToastrService) {
    this._unsubscribe$ = new Subject<boolean>();

    this._loadProgress$ = this.store.select(
      fromMaterialSelectors.selectLoadingList
    );

    this._cff_materials$ = this.store.select(
      fromMaterialSelectors.selectMaterialsList
    );
    this._material_selected$ = this.store.select(
      fromMaterialSelectors.selectedMaterialSelector
    );
    this.space_selected$ = this.store.select(
      fromSpaceSelectors.selectedSpaceSelector
    );
    this._response$ = this.store.select(fromMaterialSelectors.selectResponse);
  }

  ngOnInit() {
    this._setSelected();
    this._renderMAterials();
    this._listenForLoadingStatus();
  }
  ngOnDestroy(): void {
    this._unsubscribe$.next(true);
    this._unsubscribe$.complete();
  }
  private _commonChangeDetector(): void {
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

  private _setSelected() {
    this._material_selected$.subscribe((m) => {
      this.materialSelected = m;
    });
    this.selectedMaterialEmit$.emit(this.materialSelected);
  }

  public returnListTemplate(): TemplateRef<any> {
    const templateMap: any = {
      1: this._loadingRef,
      0: this._loadedRef,
    };
    return templateMap[this.loadStatus];
  }

  private _setTabs() {
    (this.allTabs = {
      pros: {
        label: 'Pros',
        items: this.materialSelected?.pros,
      },
      cons: {
        label: 'Cons',
        items: this.materialSelected?.cons,
      },
    }),
      this._commonChangeDetector();
  }
  public async loadMaterials() {
    const existingSpaces = await firstValueFrom(this._cff_materials$);
    const response = await firstValueFrom(this._response$);
    if (existingSpaces.length) {
      return;
    }
    this.store.dispatch(
      fromMaterialActions.getMaterialsFromBE({
        url: `${BASE_API}/${WEB_API_CFF_MATERIAL}`,
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

  private _renderMAterials() {
    this._cff_materials$.subscribe((data: Array<IMaterialModel>) => {
      if (data.length !== 0) {
        this.materialsArr = data;
        this.materialSelected = this.materialsArr.find(
          (m) => m.percentagePrice === 0
        );
        if (this.materialSelected)
          this.store.dispatch(
            fromMaterialActions.setSelectedMaterial({
              selected_material: this.materialSelected,
            })
          );
        this._setTabs();
      }
    });
  }

  public setDefaultMaterial() {
    let defaultMaterial = this.materialsArr.find(
      (m) => m.percentagePrice === 0
    );
    if (defaultMaterial) {
      this.store.dispatch(
        fromMaterialActions.setSelectedMaterial({
          selected_material: defaultMaterial,
        })
      );
      this.selectedMaterialEmit$.next(defaultMaterial);
    }
  }

  public fnSelectMaterial(material: any) {
    const value = material.target.value;
    const materialObj = this.materialsArr.find((m) => m.id === value);
    if (materialObj) {
      this.store.dispatch(
        fromMaterialActions.setSelectedMaterial({
          selected_material: materialObj,
        })
      );
      this._setTabs();
      this.selectedMaterialEmit$.emit(materialObj);
    }
  }
}
