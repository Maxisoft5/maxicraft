import { ApplicationConfig, provideBrowserGlobalErrorListeners, importProvidersFrom  } from '@angular/core';
import { provideRouter, withHashLocation, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from './translate.config';
import { LanguageService } from './services/language.service';

registerLocaleData(en);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    LanguageService,
    provideHttpClient(),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      })
    ),
    provideRouter(routes, withHashLocation(), withInMemoryScrolling({ scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' })), provideClientHydration(withEventReplay()), provideNzI18n(en_US)
  ]
};
