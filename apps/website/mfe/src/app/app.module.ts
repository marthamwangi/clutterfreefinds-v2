import { NgModule, isDevMode } from '@angular/core';
import { AppComponent } from './app.component';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { APP_ROUTES } from './app.routes';
import { AppBrowserModuleModule } from './app.browser.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrComponent } from '@clutterfreefinds-v2/toastr';
import { HeaderComponent } from '@clutterfreefinds-v2/header';
import { FooterComponent } from '@clutterfreefinds-v2/footer';
import { TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CFFServiceEffects } from './pages/instant-quote/client/sections/quote-service/data/quote-service.effects';
import { APP_STORE } from './pages/instant-quote/client/sections/quote-service/model/cffSservice.model';

@NgModule({
  declarations: [AppComponent, ToastrComponent],
  imports: [
    FooterComponent,
    HeaderComponent,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule,
    ToastrModule.forRoot({
      toastComponent: ToastrComponent,
    }),

    RouterModule.forRoot(APP_ROUTES, {
      initialNavigation: 'enabledBlocking',
      scrollPositionRestoration: 'enabled',
    }),
    AppBrowserModuleModule,
    StoreModule.forRoot(APP_STORE),
    EffectsModule.forRoot([CFFServiceEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: !isDevMode(),
    }),
  ],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule {}
