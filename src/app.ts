import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';


// if (environment.production) {
//   enableProdMode();
// }

enableProdMode();

platformBrowserDynamic().bootstrapModule(AppModule).catch(function(e) {
  window['errorHandler'].call(window,e,'APP_MODULE_BOOTSTRAP');
});
