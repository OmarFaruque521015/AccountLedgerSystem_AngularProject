import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AccountFormComponent } from "./features/account/account-form/account-form";
import { HeaderComponent } from "./header-component/header-component";

@Component({
  selector: 'app-root',
   standalone: true,
  imports: [RouterOutlet, AccountFormComponent, HeaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('AccountLedgerSystem');
}
