import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { SUPPORTED_LANGUAGES } from '@clutterfreefinds-v2/globals';
@Component({
  selector: 'cff-language',
  standalone: true,
  imports: [NgFor],
  templateUrl: './language.component.html',
})
export class LanguageComponent {
  constructor(public translate: TranslateService) {}
  public SUPPORTED_LANGUAGES = [
    ...new Set(Object.values(SUPPORTED_LANGUAGES)),
  ] as string[];
}
