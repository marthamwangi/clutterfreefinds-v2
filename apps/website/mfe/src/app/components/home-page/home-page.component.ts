import { Component } from '@angular/core';
import { HeroComponent } from './sections/hero/hero.component';
import { WhyCffComponent } from './sections/why-cff/why-cff.component';
import { WhatWeDoComponent } from './sections/what-we-do/what-we-do.component';
import { TheProcessComponent } from './sections/the-process/the-process.component';
import { OurCommunityComponent } from './sections/our-community/our-community.component';
import { HowWeDoItComponent } from './sections/how-we-do-it/how-we-do-it.component';
import { FaqSectionComponent } from './sections/faq-section/faq-section.component';
import { FooterComponent } from '@clutterfreefinds-v2/footer';
import { HowItWorksComponent } from '../how-it-works/how-it-works.component';
@Component({
  selector: 'cff-v2-home-page',
  standalone: true,
  imports: [
    HeroComponent,
    WhatWeDoComponent,
    WhyCffComponent,
    TheProcessComponent,
    OurCommunityComponent,
    HowWeDoItComponent,
    FaqSectionComponent,
    FooterComponent,
    HowItWorksComponent,
  ],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {}
