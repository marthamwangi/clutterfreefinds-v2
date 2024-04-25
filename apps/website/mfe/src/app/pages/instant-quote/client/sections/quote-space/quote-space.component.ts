import { NgFor, AsyncPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ISpaceModel } from './models/space.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppState } from 'apps/website/mfe/src/app/shared/interface';
import { Store } from '@ngrx/store';
import { fromSpaceSelectors } from './data/quote-space.selectors';

@Component({
  selector: 'iq-quote-space',
  standalone: true,
  imports: [NgFor, AsyncPipe, FormsModule],
  templateUrl: './quote-space.component.html',
  styleUrls: ['./quote-space.component.scss'],
})
export class QuoteSpaceComponent {
  @Output() selectedSpaceEmit$ = new EventEmitter<ISpaceModel>();
  @Input() isServiceSelected: any;
  @Input() selectedCffSpace!: ISpaceModel;

  private store: Store<AppState> = inject(Store);

  private _cff_spaces$: Observable<Array<ISpaceModel>>;

  public spaceProgress: boolean = false;
  public spacesArr: Array<ISpaceModel> = [];

  public selectedSpace$: BehaviorSubject<ISpaceModel>;
  public selectedSpace!: ISpaceModel;

  constructor() {
    this._cff_spaces$ = this.store.select(fromSpaceSelectors.selectSepacesList);
    this.selectedSpace$ = new BehaviorSubject<ISpaceModel>({
      id: '',
      name: '',
      maxHours: 1,
      minHours: 1,
    });
    this.selectedSpace$.subscribe({
      next: (space) => {
        this.selectedSpace = space;
      },
    });
  }

  ngOnInit() {
    this._getAllSpaces();
  }
  private _getAllSpaces(): void {
    this._cff_spaces$.subscribe((data: Array<ISpaceModel>) => {
      this.spacesArr = data;
    });
  }

  public fnSelectSpace(space: ISpaceModel) {
    this.selectedSpace$.next(space);
    this.selectedSpaceEmit$.emit(space);
  }
}
