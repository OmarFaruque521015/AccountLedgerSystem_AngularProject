import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(ReactiveFormsModule),
    provideAnimations(),
    importProvidersFrom(ToastrModule.forRoot({ timeOut: 3000 }))
  ]
}).catch(err => console.error(err));
