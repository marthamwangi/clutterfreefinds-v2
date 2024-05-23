import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'wcff-how-it-works-page',
  standalone: true,
  imports: [TranslateModule, NgFor],
  templateUrl: './how-it-works-page.component.html',
})
export class HowItWorksPageComponent {
  public steps: Array<any> = [
    {
      title: 'HOW_IT_WORKS_PAGE.STEPS.STEP_1.TITLE',
      steps: [
        'HOW_IT_WORKS_PAGE.STEPS.STEP_1.STEP1',
        'HOW_IT_WORKS_PAGE.STEPS.STEP_1.STEP2',
        'HOW_IT_WORKS_PAGE.STEPS.STEP_1.STEP3',
      ],
    },
    {
      title: 'HOW_IT_WORKS_PAGE.STEPS.STEP_2.TITLE',
      steps: [
        'HOW_IT_WORKS_PAGE.STEPS.STEP_2.STEP1',
        'HOW_IT_WORKS_PAGE.STEPS.STEP_2.STEP2',
        'HOW_IT_WORKS_PAGE.STEPS.STEP_2.STEP3',
      ],
    },
    {
      title: 'HOW_IT_WORKS_PAGE.STEPS.STEP_3.TITLE',
      steps: [
        'HOW_IT_WORKS_PAGE.STEPS.STEP_3.STEP1',
        'HOW_IT_WORKS_PAGE.STEPS.STEP_3.STEP2',
      ],
    },
    {
      title: 'HOW_IT_WORKS_PAGE.STEPS.STEP_4.TITLE',
      steps: [
        'HOW_IT_WORKS_PAGE.STEPS.STEP_4.STEP1',
        'HOW_IT_WORKS_PAGE.STEPS.STEP_4.STEP2',
      ],
    },
    {
      title: 'HOW_IT_WORKS_PAGE.STEPS.STEP_5.TITLE',
      steps: [
        'HOW_IT_WORKS_PAGE.STEPS.STEP_5.STEP1',
        'HOW_IT_WORKS_PAGE.STEPS.STEP_5.STEP2',
        'HOW_IT_WORKS_PAGE.STEPS.STEP_5.STEP3',
      ],
    },
  ];
}
