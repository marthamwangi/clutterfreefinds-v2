import { Component, Injector } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { BasePage } from '../../../base.page';

@Component({
  selector: 'about-hero-section',
  standalone: true,
  imports: [TranslateModule, RouterLink],
  templateUrl: './hero-section.component.html',
})
export class HeroSectionComponent extends BasePage {
  constructor(injector: Injector) {
    super(injector);
  }
}
