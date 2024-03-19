import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { HeroComponent } from './sections/hero/hero.component';
import { WhyCffComponent } from './sections/why-cff/why-cff.component';
import { WhatWeDoComponent } from './sections/what-we-do/what-we-do.component';
import { TheProcessComponent } from './sections/the-process/the-process.component';
import { OurCommunityComponent } from './sections/our-community/our-community.component';
import { HowWeDoItComponent } from './sections/how-we-do-it/how-we-do-it.component';
import { FaqSectionComponent } from '../faq-section/faq-section.component';
import { FooterComponent } from '@clutterfreefinds-v2/footer';
@Component({
  selector: 'cff-v2-home-page',
  standalone: true,
  imports: [
    HeaderComponent,
    HeroComponent,
    WhatWeDoComponent,
    WhyCffComponent,
    TheProcessComponent,
    OurCommunityComponent,
    HowWeDoItComponent,
    FaqSectionComponent,
    FooterComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {}
