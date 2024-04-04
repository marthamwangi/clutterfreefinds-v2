import { NgFor, AsyncPipe } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ISpaceModel } from '../../../models/space.model';
import { SpaceService } from '../../services/space.service';
import { BehaviorSubject } from 'rxjs';
import { BASE_API, WEB_API_CFF_SPACE } from '@clutterfreefinds-v2/globals';

@Component({
  selector: 'iq-quote-space',
  standalone: true,
  imports: [NgFor, AsyncPipe, FormsModule],
  templateUrl: './quote-space.component.html',
  styleUrls: ['./quote-space.component.scss'],
})
export class QuoteSpaceComponent {
  @Output() selectedSpaceEmit$ = new EventEmitter<ISpaceModel>();

  public spaceProgress: boolean = false;
  public spacesArr: Array<ISpaceModel> = [];

  public selectedSpace$: BehaviorSubject<ISpaceModel>;
  public selectedSpace!: ISpaceModel;

  constructor(private _spaceService: SpaceService) {
    this.selectedSpace$ = new BehaviorSubject<ISpaceModel>({
      name: '',
      maxHours: 1,
      minHours: 1,
      isSelected: false,
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
    this.spaceProgress = true;
    this._spaceService
      .getAllSpaces(`${BASE_API}/${WEB_API_CFF_SPACE}`)
      .subscribe({
        next: (response: any) => {
          this.spaceProgress = false;
          if (response.success) {
            this.spacesArr = response.spaces;
          }
        },
        error: (error: any) => {
          this.spaceProgress = false;
        },
      });
  }

  public fnSelectSpace(space: ISpaceModel) {
    space.isSelected = true;
    this.selectedSpace$.next(space);
    this.selectedSpaceEmit$.emit(space);
  }
}
