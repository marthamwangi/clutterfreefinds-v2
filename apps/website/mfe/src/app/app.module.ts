import { NgModule } from '@angular/core';
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
      disableTimeOut: true,
    }),

    RouterModule.forRoot(APP_ROUTES, {
      initialNavigation: 'enabledBlocking',
      scrollPositionRestoration: 'enabled',
    }),
    AppBrowserModuleModule,
  ],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule {}
