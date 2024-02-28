import { Inject, NgModule } from '@angular/core';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { Request } from 'express';
import { readFileSync } from 'fs';
import { join } from 'path';
import { Observable, of } from 'rxjs';

@NgModule({
  declarations: [],
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateFSLoaderFactory,
      },
    }),
  ],
})
export class I18nServerModuleModule {
  /**
 - First, we make use of the REQUEST injection token provided by Angular to get a hold of the full request object.
 - We use the token to access the cookies object to find out what language the user selected in the browser.
 - Knowing the language, we call the use method of the TranslateService class so that our website gets rendered in that language. 
 *  */
  constructor(translate: TranslateService, @Inject(REQUEST) req: Request) {
    translate.addLangs(['en', 'sw']);
    const language: 'en' | 'sw' = req.cookies.lang || 'en';
    translate.use(language.match(/en|sw/) ? language : 'en');
  }
}

export class TranslateFSLoader implements TranslateLoader {
  constructor(private prefix = 'i18n', private suffix = '.json') {}
  public getTranslation(lang: string): Observable<any> {
    const path = join(
      __dirname,
      '../browser/assets/',
      this.prefix,
      `${lang}${this.suffix}`
    );
    const data = JSON.parse(readFileSync(path, 'utf8'));
    return of(data);
  }
}

export function translateFSLoaderFactory() {
  return new TranslateFSLoader();
}
