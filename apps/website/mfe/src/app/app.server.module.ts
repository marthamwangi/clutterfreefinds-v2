import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { I18nServerModuleModule } from './i18n/i18n-server-module.module';

@NgModule({
  imports: [AppModule, ServerModule, I18nServerModuleModule],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
