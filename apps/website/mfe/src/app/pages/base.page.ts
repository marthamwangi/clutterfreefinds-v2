import { Injector } from '@angular/core';

export abstract class BasePage {
  constructor(injector: Injector) {}

  public bookACall() {
    window.open(
      'https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0QQDjkA_UcikwXpT5tRR5pIDXoQkJBjiLJS2lvVL2RKwwu8gDAM9Gbei3ka8vc4bnun5fZS_68',
      '_blank'
    );
  }
}
