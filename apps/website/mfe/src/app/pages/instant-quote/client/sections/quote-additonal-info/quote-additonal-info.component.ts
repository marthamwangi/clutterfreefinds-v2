import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'iq-quote-additonal-info',
  standalone: true,
  imports: [MatTooltipModule, FormsModule],
  templateUrl: './quote-additonal-info.component.html',
  styleUrls: ['./quote-additonal-info.component.scss'],
})
export class QuoteAdditonalInfoComponent {
  @Output() selectedFiles$ = new EventEmitter();
  @ViewChild('tooltipRef', { static: false }) private _tooltipRef!: MatTooltip;
  public files = [];
  public filesCount: number = 0;
  public mediaPrivacy =
    "Media plays a vital role as an internal repository of the incredible work we perform. We treasure the trust you've placed in us, and when we utilize media for marketing endeavors (Before and After Pictures). Your personal information however remains guarded, never to be revealed without your consent as stipulated in this Agreement. Your privacy is our priority. Read our Service Agreement";

  public onFilesSelected($event: any): void {
    const files: FileList = $event.target.files;
    if (files) {
      this.filesCount = files.length;
      this.selectedFiles$.emit(files);
    }
  }
}
