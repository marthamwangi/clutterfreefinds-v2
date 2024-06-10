import { Component } from '@angular/core';
import { ContentSectionComponent } from './sections/content-section/content-section.component';
import { HeroSectionComponent } from './sections/hero-section/hero-section.component';

@Component({
  selector: 'wc-privacy-policy',
  standalone: true,
  imports: [ContentSectionComponent, HeroSectionComponent],
  templateUrl: './privacy-policy.component.html',
})
export class PrivacyPolicyComponent {}
