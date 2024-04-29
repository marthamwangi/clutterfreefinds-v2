import {
  Component,
  EventEmitter,
  Output,
  ViewChild,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';
import { Store } from '@ngrx/store';
import { AppState } from 'apps/website/mfe/src/app/shared/interface';
import { fromAdditionalInfoActions } from './data/quote-additional-info.actions';

interface IAdditionalInfo {
  images?: Array<string>;
  notes?: string;
}
@Component({
  selector: 'iq-quote-additonal-info',
  standalone: true,
  imports: [MatTooltipModule, FormsModule],
  templateUrl: './quote-additonal-info.component.html',
  styleUrls: ['./quote-additonal-info.component.scss'],
})
export class QuoteAdditonalInfoComponent {
  @Output() additionalInfoEmit$ = new EventEmitter();
  private store: Store<AppState> = inject(Store);
  public filesArr: any = [];
  public notes: string = '';
  public filesCount: number = 0;
  public mediaPrivacy =
    "Media plays a vital role as an internal repository of the incredible work we perform. We treasure the trust you've placed in us, and when we utilize media for marketing endeavors (Before and After Pictures). Your personal information however remains guarded, never to be revealed without your consent as stipulated in this Agreement. Your privacy is our priority. Read our Service Agreement";

  /**
   *
   * @param $event
   */
  public async onFilesSelected($event: any) {
    const fileList = $event.target.files;
    this.filesCount = fileList.length;
    function getBase64(file: any) {
      const reader = new FileReader();
      return new Promise((resolve) => {
        reader.onload = (ev) => {
          resolve(ev.target?.result);
        };
        reader.readAsDataURL(file);
      });
    }
    // here will be array of promisified functions
    const promises = [];

    // loop through fileList with for loop
    for (let i = 0; i < fileList.length; i++) {
      promises.push(getBase64(fileList[i]));
    }

    // array with base64 strings
    await Promise.all(promises).then((images) => {
      this.filesArr = images;
    });
    this._setAdditionalInfo();
  }

  public onAdditionalNotesChange($event: any) {
    this.notes = $event.target.value;
    this._setAdditionalInfo();
  }

  private _setAdditionalInfo(): void {
    const merged = {
      images: this.filesArr,
      notes: this.notes,
    };
    console.log('merged', merged);
    this.store.dispatch(
      fromAdditionalInfoActions.SET_QUOTE_ADDITIONAL_INFO({
        quote_additional_info: merged,
      })
    );
    this.additionalInfoEmit$.emit(merged);
  }
}
