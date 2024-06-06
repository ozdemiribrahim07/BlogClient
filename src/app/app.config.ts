import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { RouterModule, provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { CommonModule } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: 
  [   provideZoneChangeDetection({ eventCoalescing: true }),
      provideRouter(routes),
      provideClientHydration(),
      provideAnimationsAsync(),
      provideHttpClient(withInterceptorsFromDi()),
      importProvidersFrom(
        JwtModule.forRoot({
        config: {
          tokenGetter: () => localStorage.getItem("accessToken"),
          allowedDomains: ["localhost:44366"],
        }
      }),
      CommonModule,
      
    ),
      {provide : "baseUrl" , useValue : "https://localhost:44366/api", multi : true},
     
    
  ]
};
