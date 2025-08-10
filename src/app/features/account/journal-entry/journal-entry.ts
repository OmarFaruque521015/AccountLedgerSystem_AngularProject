import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { RouterModule } from '@angular/router';
import { AccountLSService } from '../../../../core/services/accountJS.service';
import { JournalEntry } from '../../../../shared/models/journal-entry.model';

@Component({
  selector: 'app-journal-entry',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule],
  templateUrl: './journal-entry.html',
  providers: [DatePipe]
})
export class JournalEntryComponent implements OnInit {
  journalEntryForm: FormGroup;
  journalEntries: JournalEntry[] = [];

  public oJournalEntry = new JournalEntry();

  constructor(
    private fb: FormBuilder,
    private accountLSService: AccountLSService,
    private toastr: ToastrService
    , private datePipe: DatePipe
  ) {
    this.journalEntryForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.LoadJournalEntries();
  }

  EditJournalEntries(account: any) {
    this.oJournalEntry = new JournalEntry();
    this.oJournalEntry.id = Number(account.id);
    this.oJournalEntry.date = account.date;
    this.oJournalEntry.description = account.description;

    document.getElementById("openmodal")?.click();
  }

  RemoveJournalEntries(account: any) {
    this.oJournalEntry = new JournalEntry();
    this.oJournalEntry.id = Number(account.id)

    if (confirm(`Are you sure want to delete account:${account.name}`)) {
      this.accountLSService.RemoveAccount(this.oJournalEntry.id).subscribe({
        next: (res) => {
          console.log('Account Journal deleted successfully!');
          this.toastr.success('Deleted data successfully!');
          document.getElementById("closeModdal")?.click();
          this.oJournalEntry = new JournalEntry();
          this.LoadJournalEntries();
        }
      })
    }
  }


  UpdateJournalEntry() {
    if (!this.oJournalEntry?.id) {
      this.toastr.error('No journal entry selected for update.');
      return;
    }

    this.accountLSService.Post("/JournalEntry/update/" + Number(this.oJournalEntry.id), this.oJournalEntry).subscribe({
      next: (res) => {
        console.log('Update successful', res);
        this.toastr.success('Account Journal Updated successfully!');
        document.getElementById("closeModdal")?.click();
        this.oJournalEntry = new JournalEntry(); // reset form
        this.LoadJournalEntries(); // reload updated list
      },
      error: (err) => {
        console.error('Update failed', err);
        this.toastr.error('Failed to update account journal.');
      },
    });
  }


  InsertJournalEntry() {
    this.accountLSService.Post("/JournalEntry/create", this.oJournalEntry).subscribe({
      next: () => {
        this.toastr.success('Account Journal created!');
        document.getElementById("closeModdal")?.click();
        this.oJournalEntry = new JournalEntry();
        this.LoadJournalEntries();
      },
      error: (err) => {
        // this.toastr.error('Failed to create account.');
        const errorMsg = err.error?.error || 'Account Journal already exists.';
        this.toastr.error(errorMsg, 'Error');
      },
    });
  }

  DeleteAccount() {
    if (!this.oJournalEntry?.id) {
      this.toastr.error('No account selected to delete.');
      return;
    }
    this.accountLSService.RemoveAccount(this.oJournalEntry.id).subscribe({
      next: () => {
        this.toastr.success('Account deleted successfully!');
        document.getElementById("closeModdal")?.click();
        this.oJournalEntry = new JournalEntry();  // reset object
        this.LoadJournalEntries();  // reload the account list
      },
      error: () => {
        this.toastr.error('Failed to delete account.');
      },
    });
  }

  addAccount() {
    document.getElementById("openmodal")?.click();
  }

  LoadJournalEntries() {
    this.accountLSService.getAllData("/JournalEntry/getJournalEntry").subscribe({
      next: (data: any) => {
        // this.journalEntries = data;
        this.journalEntries = data.map((entry: JournalEntry) => ({
          ...entry,
          date: new Date(entry.date).toISOString().split('T')[0]
        }));
      },
      error: () => {
        this.toastr.error('There is no Data found!');
      }
    })
  }


}
