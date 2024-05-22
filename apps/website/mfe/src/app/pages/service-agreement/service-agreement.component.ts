import { Component } from '@angular/core';
import { ContentSectionComponent } from './sections/content-section/content-section.component';
import { HeroSectionComponent } from './sections/hero-section/hero-section.component';

@Component({
  selector: 'sa-service-agreement',
  standalone: true,
  imports: [ContentSectionComponent, HeroSectionComponent],
  templateUrl: './service-agreement.component.html',
})
export class ServiceAgreementComponent {}
