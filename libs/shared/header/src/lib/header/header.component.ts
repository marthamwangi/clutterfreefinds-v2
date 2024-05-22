import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageComponent } from '@clutterfreefinds-v2/language';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
@Component({
  selector: 'cff-header',
  standalone: true,
  imports: [TranslateModule, LanguageComponent, NgFor, RouterLink],
  templateUrl: './header.component.html',
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          display: 'none',
          opacity: 0,
          transform: 'translateY(0.25rem)',
        })
      ),
      state(
        'closed',
        style({
          opacity: 1,
          transform: 'translateY(0px)',
        })
      ),
      transition('open => closed', [
        animate(
          '150ms ease-out',
          style({
            opacity: 1,
            transform: 'translateY(0)',
          })
        ),
      ]),
      transition('closed => open', [
        animate(
          '200ms ease-in',
          style({
            opacity: 0,
            display: 'none',
            transform: 'translateY(0.25rem)',
          })
        ),
      ]),
    ]),
  ],
})
export class HeaderComponent {
  dropdownCompanyOpen: boolean = true;

  get openCloseCustomerMegaMenuTrigger() {
    return this.dropdownCompanyOpen ? 'open' : 'closed';
  }

  public toggleCustomerMegaMenu() {
    this.dropdownCompanyOpen = !this.dropdownCompanyOpen;
  }
}
