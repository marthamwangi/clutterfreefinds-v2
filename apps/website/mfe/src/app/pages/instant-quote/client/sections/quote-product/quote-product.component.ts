import { NgFor, AsyncPipe, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IMaterialModel } from './models/material.model';
import { Observable } from 'rxjs';
import { RouterOutlet } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { TabComponent } from './sections/tab/tab.component';
import { Store } from '@ngrx/store';
import { AppState } from 'apps/website/mfe/src/app/shared/interface';
import { fromMaterialSelectors } from './data/quote-material.selectors';
import { fromMaterialActions } from './data/quote-material.action';
import { BASE_API, WEB_API_CFF_MATERIAL } from '@clutterfreefinds-v2/globals';
import { ISpaceModel } from '../quote-space/models/space.model';
import { fromSpaceSelectors } from '../quote-space/data/quote-space.selectors';

@Component({
  selector: 'iq-quote-product',
  standalone: true,
  imports: [
    RouterOutlet,
    NgFor,
    AsyncPipe,
    FormsModule,
    MatTabsModule,
    TabComponent,
    NgIf,
  ],
  templateUrl: './quote-product.component.html',
  styleUrls: ['./quote-product.component.scss'],
})
export class QuoteProductComponent implements OnInit {
  private store: Store<AppState> = inject(Store);
  @Output() selectedMaterialEmit$ = new EventEmitter<IMaterialModel>();
  @ViewChild('Pros', { static: true })
  private Pros!: TemplateRef<any>;

  @ViewChild('Cons', { static: true })
  private Cons!: TemplateRef<any>;

  public isSpaceSelected!: ISpaceModel;
  public materialSelected!: IMaterialModel;

  allTabs: any;

  private _cff_materials$: Observable<Array<IMaterialModel>>;
  public _material_selected$: Observable<IMaterialModel>;
  private _space_selected$: Observable<ISpaceModel>;

  public materialProgress: boolean = false;
  public materialsArr: Array<IMaterialModel> = [];

  constructor() {
    this._cff_materials$ = this.store.select(
      fromMaterialSelectors.selectMaterialsList
    );
    this._material_selected$ = this.store.select(
      fromMaterialSelectors.selectedMaterialSelector
    );
    this._space_selected$ = this.store.select(
      fromSpaceSelectors.selectedSpaceSelector
    );
  }

  ngOnInit() {
    this._setSelected();
    this._renderMAterials();
  }
  private _setSelected() {
    this._space_selected$.subscribe((space) => {
      this.isSpaceSelected = space;
    });
    this._material_selected$.subscribe((m) => {
      this.materialSelected = m;
    });
  }

  private _setTabs() {
    this.allTabs = [
      { name: 'Pros', template: this.Pros },
      { name: 'Cons', template: this.Cons },
    ];
  }
  public loadMaterials(): void {
    this.store.dispatch(
      fromMaterialActions.getMaterialsFromBE({
        url: `${BASE_API}/${WEB_API_CFF_MATERIAL}`,
      })
    );
  }

  private _renderMAterials() {
    this._cff_materials$.subscribe((data: Array<IMaterialModel>) => {
      if (data.length !== 0) {
        this.materialsArr = this.materialsArr.concat(data);
        this._setTabs();
      }
    });
  }

  public setDefaultMaterial() {
    // this.selectedMaterial$.next(this.defaultSelectedMAterial);
  }

  public fnSelectMaterial(material: any) {
    const value = material;
    console.log('value', value);
    const materialObj = this.materialsArr.find((m) => m.id === value);
    if (materialObj) {
      this.store.dispatch(
        fromMaterialActions.setSelectedMaterial({
          selected_material: materialObj,
        })
      );
      this.selectedMaterialEmit$.emit(materialObj);
    }
  }
}
