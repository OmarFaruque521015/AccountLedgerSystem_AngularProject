import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AccountService } from '../../../../core/services/account.service';
import { ToastrService } from 'ngx-toastr';
import { account } from '../../../../shared/models/account.model';

@Component({
  selector: 'app-account-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './account-form.html',
})
export class AccountFormComponent implements OnInit {
  accountForm: FormGroup;
  accounts: account[] = [];
   paginatedAccounts: account[] = [];
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 0;
  
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

  onSubmit() {
    if (this.accountForm.valid) {
      this.accountService.createAccount(this.accountForm.value).subscribe({
        next: () => {
          this.toastr.success('Account created!');
          this.accountForm.reset();
          this.LoadAccounts();
        },
        error: () => {
          this.toastr.error('Failed to create account.');
        },
      });
    } else {
      this.toastr.warning('Please fill out all required fields.');
    }
  }

  // LoadAccounts() {
  //   this.accountService.getAccounts().subscribe({
  //     next: (data) => {
  //       this.accounts=data;
  //     },
  //     error:()=>{
  //       this.toastr.error('There is no Data found!');
  //     }
  //   })
  // }

  LoadAccounts() {
    this.accountService.getAccounts().subscribe({
      next: (data) => {
        this.accounts = data;
        this.totalPages = Math.ceil(this.accounts.length / this.pageSize);
        this.setPaginatedData();
      },
      error: () => {
        this.toastr.error('Failed to load accounts');
      },
    });
  }

  setPaginatedData() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedAccounts = this.accounts.slice(startIndex, endIndex);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.setPaginatedData();
    }
  }
}
