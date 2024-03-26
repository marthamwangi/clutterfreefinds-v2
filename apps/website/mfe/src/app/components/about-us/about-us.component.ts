import { Component } from '@angular/core';
import { HowItWorksComponent } from '../how-it-works/how-it-works.component';
import { HeroSectionComponent } from './sections/hero-section/hero-section.component';
import { WhoIsSectionComponent } from './sections/who-is-section/who-is-section.component';
import { OurVisionComponent } from './sections/our-vision/our-vision.component';
import { OurMisionComponent } from './sections/our-mision/our-mision.component';

@Component({
  selector: 'wc-about-us',
  standalone: true,
  imports: [
    HowItWorksComponent,
    HeroSectionComponent,
    WhoIsSectionComponent,
    OurVisionComponent,
    OurMisionComponent,
  ],
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss'],
})
export class AboutUsComponent {}
