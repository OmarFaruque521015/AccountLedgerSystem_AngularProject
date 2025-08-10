import { Routes } from '@angular/router';
import { AccountFormComponent } from './features/account/account-form/account-form';
import { JournalEntryComponent } from './features/account/journal-entry/journal-entry';

export const routes: Routes = [
  { path: '', redirectTo: 'account', pathMatch: 'full' },
  { path: 'account', component: AccountFormComponent },
  { path: 'journalEntry', component: JournalEntryComponent }
];
