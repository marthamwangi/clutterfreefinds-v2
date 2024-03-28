import { Component } from '@angular/core';
import { HowItWorksComponent } from '../../components/how-it-works/how-it-works.component';
import { ContentSectionComponent } from './sections/content-section/content-section.component';
import { HeroSectionComponent } from './sections/hero-section/hero-section.component';

@Component({
  selector: 'sa-service-agreement',
  standalone: true,
  imports: [HowItWorksComponent, ContentSectionComponent, HeroSectionComponent],
  templateUrl: './service-agreement.component.html',
})
export class ServiceAgreementComponent {}
