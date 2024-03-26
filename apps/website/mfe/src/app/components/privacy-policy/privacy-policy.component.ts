import { Component } from '@angular/core';
import { HeaderComponent } from '@clutterfreefinds-v2/header';
import { FooterComponent } from '@clutterfreefinds-v2/footer';
import { HowItWorksComponent } from '../how-it-works/how-it-works.component';
import { ContentSectionComponent } from './sections/content-section/content-section.component';
import { HeroSectionComponent } from './sections/hero-section/hero-section.component';

@Component({
  selector: 'wc-privacy-policy',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    HowItWorksComponent,
    ContentSectionComponent,
    HeroSectionComponent,
  ],
  templateUrl: './privacy-policy.component.html',
})
export class PrivacyPolicyComponent {}
