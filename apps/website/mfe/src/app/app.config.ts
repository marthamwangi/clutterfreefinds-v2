import {
  ApplicationConfig,
  importProvidersFrom,
  isDevMode,
} from '@angular/core';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
  withInMemoryScrolling,
} from '@angular/router';

import { APP_ROUTES } from './app.routes';
import {
  provideClientHydration,
  withHttpTransferCacheOptions,
} from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { AppBrowserModuleModule } from './app.browser.module';
import { ToastrComponent } from '@clutterfreefinds-v2/toastr';
import { StoreModule } from '@ngrx/store';
import { APP_EFFECTS, APP_STORE } from '@clutterfreefinds-v2/globals';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      APP_ROUTES,
      withEnabledBlockingInitialNavigation(),
      withInMemoryScrolling()
    ),
    provideClientHydration(
      withHttpTransferCacheOptions({ includePostRequests: true })
    ),
    provideHttpClient(withFetch()),
    importProvidersFrom(
      BrowserAnimationsModule,
      AppBrowserModuleModule,
      ToastrModule.forRoot({
        toastComponent: ToastrComponent,
      }),
      StoreModule.forRoot(APP_STORE.cff_store),
      EffectsModule.forRoot(APP_EFFECTS),
      StoreDevtoolsModule.instrument({
        maxAge: 25,
        logOnly: !isDevMode(),
      })
    ),
  ],
};
