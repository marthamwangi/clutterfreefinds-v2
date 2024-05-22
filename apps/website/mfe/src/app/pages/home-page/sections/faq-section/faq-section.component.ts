import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'cff-v2-faq-section',
  standalone: true,
  imports: [TranslateModule, NgFor],
  templateUrl: './faq-section.component.html',
})
export class FaqSectionComponent {
  public questions: Array<{ question: string; answer: string }> = [
    {
      question: 'FAQ.QUESTIONS.ITEM_1.QUESTION',
      answer: 'FAQ.QUESTIONS.ITEM_1.ANSWER',
    },
    {
      question: 'FAQ.QUESTIONS.ITEM_2.QUESTION',
      answer: 'FAQ.QUESTIONS.ITEM_2.ANSWER',
    },
    {
      question: 'FAQ.QUESTIONS.ITEM_3.QUESTION',
      answer: 'FAQ.QUESTIONS.ITEM_3.ANSWER',
    },
    {
      question: 'FAQ.QUESTIONS.ITEM_4.QUESTION',
      answer: 'FAQ.QUESTIONS.ITEM_4.ANSWER',
    },
    {
      question: 'FAQ.QUESTIONS.ITEM_5.QUESTION',
      answer: 'FAQ.QUESTIONS.ITEM_5.ANSWER',
    },
  ];
}
