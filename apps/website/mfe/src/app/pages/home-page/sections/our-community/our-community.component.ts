import { Component, Injector } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { BasePage } from '../../../base.page';

@Component({
  selector: 'cff-v2-our-community',
  standalone: true,
  imports: [TranslateModule, RouterLink],
  templateUrl: './our-community.component.html',
})
export class OurCommunityComponent extends BasePage {
  constructor(injector: Injector) {
    super(injector);
  }
}
