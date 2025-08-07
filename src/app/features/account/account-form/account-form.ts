import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AccountService } from '../../../../core/services/account.service';
import { ToastrService } from 'ngx-toastr';
import { Account, account } from '../../../../shared/models/account.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-account-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule],
  templateUrl: './account-form.html',
})
export class AccountFormComponent implements OnInit {
  accountForm: FormGroup;
  accounts: account[] = [];
  accountId: number = 0;

  public oAccount = new Account();

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private toastr: ToastrService
  ) {
    this.accountForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.LoadAccounts();
  }

  EditAccount(account: any) {
    this.oAccount = new Account();
    this.oAccount.id = Number(account.id);
    this.oAccount.name = account.name;
    this.oAccount.type = account.type;

    document.getElementById("openmodal")?.click();
  }

  RemoveAccount(account: any) {
    debugger
    this.oAccount = new Account();
    this.oAccount.id = Number(account.id)

    if (confirm(`Are you sure want to delete account:${account.name}`)) {
      this.accountService.RemoveAccount(this.oAccount.id).subscribe({
        next: (res) => {
          console.log('Account deleted successfully!');
          this.toastr.success('Deleted data successfully!');
          document.getElementById("closeModdal")?.click();
          this.oAccount = new Account();
          this.LoadAccounts();
        }
      })
    }
  }

  UpdateAccount() {
    debugger
    this.accountService.updateAccount(Number(this.oAccount.id), this.oAccount).subscribe({
      next: (res) => {
        console.log('Update successful', res);
        this.toastr.success('Account Updated successfully!');
        document.getElementById("closeModdal")?.click();
        this.oAccount = new Account();
        this.LoadAccounts();
      },
      error: (err) => {
        console.error('Update failed', err);
        this.toastr.error('Failed to create account.');
      },
    });
  }

  InsertAccount() {
    debugger
    this.accountService.createAccount(this.oAccount).subscribe({
      next: () => {
        this.toastr.success('Account created!');
        document.getElementById("closeModdal")?.click();
        this.oAccount = new Account();
        this.LoadAccounts();
      },
      error: () => {
        this.toastr.error('Failed to create account.');
      },
    });
  }

  DeleteAccount() {
    debugger
    this.accountService.createAccount(this.oAccount).subscribe({
      next: () => {
        debugger
        this.toastr.success('Account created!');
        document.getElementById("closeModdal")?.click();
        this.oAccount = new Account();
        this.LoadAccounts();
      },
      error: () => {
        this.toastr.error('Failed to create account.');
      },
    });
  }

  addAccount() {
    document.getElementById("openmodal")?.click();
  }

  LoadAccounts() {
    this.accountService.getAccounts().subscribe({
      next: (data) => {
        this.accounts = data;
      },
      error: () => {
        this.toastr.error('There is no Data found!');
      }
    })
  }


}
