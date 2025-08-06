import { Routes } from '@angular/router';
import { AccountFormComponent } from './features/account/account-form/account-form';

export const routes: Routes = [
  { path: '', redirectTo: 'account', pathMatch: 'full' },
  { path: 'account', component: AccountFormComponent }
];
