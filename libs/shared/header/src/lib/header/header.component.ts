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
    /**
    Flyout menu, show/hide based on flyout menu state.

    Entering: "transition ease-out duration-200"
      From: "opacity-0 translate-y-1"
      To: "opacity-100 translate-y-0"
    Leaving: "transition ease-in duration-150"
      From: "opacity-100 translate-y-0"
      To: "opacity-0 translate-y-1"
**/
    trigger('openClose', [
      state(
        'open',
        style({
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
