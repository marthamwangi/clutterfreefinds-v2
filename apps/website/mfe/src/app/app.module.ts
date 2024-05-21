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
import { APP_EFFECTS, APP_STORE } from './shared/interface';
import { BannerComponent } from './components/banner/banner.component';

@NgModule({
  declarations: [AppComponent, ToastrComponent],
  imports: [
    FooterComponent,
    HeaderComponent,
    BannerComponent,
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
    StoreModule.forRoot(APP_STORE.cff_store),
    EffectsModule.forRoot(APP_EFFECTS),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: !isDevMode(),
    }),
  ],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule {}
