import { Component, Injector } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { BasePage } from '../../../base.page';

@Component({
  selector: 'cff-v2-why-cff',
  standalone: true,
  imports: [TranslateModule, RouterLink],
  templateUrl: './why-cff.component.html',
})
export class WhyCffComponent extends BasePage {
  constructor(injector: Injector) {
    super(injector);
  }
}
