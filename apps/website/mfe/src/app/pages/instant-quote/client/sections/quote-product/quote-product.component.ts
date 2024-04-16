import { NgFor, AsyncPipe, NgIf } from '@angular/common';
import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IMaterialModel } from '../../../models/material.model';
import { BehaviorSubject } from 'rxjs';
import { MaterialService } from '../../services/material.service';
import { BASE_API, WEB_API_CFF_MATERIAL } from '@clutterfreefinds-v2/globals';
import { RouterOutlet } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { TabComponent } from './sections/tab/tab.component';

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
  @Output() selectedMaterialEmit$ = new EventEmitter<IMaterialModel>();
  @ViewChild('Pros', { static: true })
  private Pros!: TemplateRef<any>;

  @ViewChild('Cons', { static: true })
  private Cons!: TemplateRef<any>;

  allTabs: any;

  public defaultSelectedMAterial: IMaterialModel = {
    name: 'Choose a material',
    percentagePrice: 1,
    pros: [],
    cons: [],
    isSelected: false,
  };

  public materialProgress: boolean = false;
  public materialsArr: Array<IMaterialModel> = [this.defaultSelectedMAterial];

  public selectedMaterial$: BehaviorSubject<IMaterialModel>;
  public pickedMaterial!: IMaterialModel;

  constructor(private _materialService: MaterialService) {
    this.selectedMaterial$ = new BehaviorSubject<IMaterialModel>(
      this.defaultSelectedMAterial
    );
    this.selectedMaterial$.subscribe({
      next: (material) => {
        this.pickedMaterial = material;
      },
    });
  }

  ngOnInit() {
    this._getAllMaterials();
  }

  private _setTabs() {
    this.allTabs = [
      { name: 'Pros', template: this.Pros },
      { name: 'Cons', template: this.Cons },
    ];
  }
  private _getAllMaterials(): void {
    this.materialProgress = true;
    this._materialService
      .getAllMaterials(`${BASE_API}/${WEB_API_CFF_MATERIAL}`)
      .subscribe({
        next: (response: any) => {
          this.materialProgress = false;
          if (response.success) {
            for (let index = 0; index < response.materials.length; index++) {
              const element = response.materials[index];
              this.materialsArr.push(element);
            }
            this._setTabs();
          }
        },
        error: (error: any) => {
          this.materialProgress = false;
        },
      });
  }

  public fnSelectMaterial(material: IMaterialModel) {
    material.isSelected = true;
    this.selectedMaterialEmit$.emit(material);
  }
}
