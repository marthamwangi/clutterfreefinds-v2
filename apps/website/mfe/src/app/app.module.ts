import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DEFAULT_APP_LANGUAGE } from '@clutterfreefinds-v2/globals';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      defaultLanguage: DEFAULT_APP_LANGUAGE,
    }),
  ],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule {}

// AoT requires an exported function for factories
function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/');
}
