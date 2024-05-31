import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'apps/website/mfe/src/app/shared/interface';
import { fromAdditionalInfoActions } from './data/quote-additional-info.actions';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { fromAdditionalInfoSelectors } from './data/quote-additional-info.selectors';
import { Observable } from 'rxjs';
import { initModals } from 'flowbite';
@Component({
  selector: 'iq-quote-additonal-info',
  standalone: true,
  imports: [FormsModule, NgFor, AsyncPipe, NgIf],
  templateUrl: './quote-additonal-info.component.html',
})
export class QuoteAdditonalInfoComponent {
  @Output() additionalInfoEmit$ = new EventEmitter();
  private store: Store<AppState> = inject(Store);
  public filesArr: any;
  public filesArr$: Observable<any>;
  public notes$: Observable<string | undefined>;
  public notes: any = '';
  public filesCount: number = 0;
  public mediaPrivacy =
    "Media plays a vital role as an internal repository of the incredible work we perform. We treasure the trust you've placed in us, and when we utilize media for marketing endeavors (Before and After Pictures). Your personal information however remains guarded, never to be revealed without your consent as stipulated in this Agreement. Your privacy is our priority. Read our Service Agreement";

  constructor() {
    this.filesArr$ = this.store.select(
      fromAdditionalInfoSelectors.quoteImagesSelector
    );
    this.notes$ = this.store.select(
      fromAdditionalInfoSelectors.quoteNotesSelector
    );
  }
  ngOnInit() {
    this._setSelected();
    initModals();
  }
  private _setSelected() {
    this.filesArr$.subscribe((arr) => {
      this.filesArr = arr;
    });
    this.notes$.subscribe((notes) => {
      this.notes = notes;
    });
  }
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
    this.store.dispatch(
      fromAdditionalInfoActions.SET_QUOTE_ADDITIONAL_INFO({
        quote_additional_info: merged,
      })
    );
    this.additionalInfoEmit$.emit(merged);
  }
  public deleteImage(index: number) {
    const copy = Array.from(this.filesArr);
    copy.splice(index, 1);
    this.filesArr = [...copy];
    this.filesCount = this.filesArr.length;
    this._setAdditionalInfo();
  }
}
