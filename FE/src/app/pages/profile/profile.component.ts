import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ErrorMessageLabelComponent } from "src/app/components/error-message-label/error-message-label.component";
import { LoaderComponent } from "src/app/components/loader/loader.component";
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { BankType } from 'src/app/enum/backEnum';
import { BankAccount } from 'src/app/model/bankAccount';
import { User } from 'src/app/model/user';
import { BackAccountProviderService } from 'src/app/provider/back-account.provider';
import { ProfileProviderService } from 'src/app/provider/profile.provider';
import { UserLogService } from 'src/app/services/user-log.service';
import { BankListComponent } from "src/app/components/bank-list/bank-list.component";
import { DomSanitizer } from '@angular/platform-browser';
import { ButtonComponent } from "src/app/components/button/button.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  standalone: true,
  imports: [ErrorMessageLabelComponent, LoaderComponent, CommonModule, ModalComponent, FormsModule, BankListComponent, ButtonComponent]
})
export class ProfileComponent implements OnInit {

  private sanitizer: DomSanitizer = inject(DomSanitizer);

  constructor() { }

  isEdit: boolean = false;
  isLoading: boolean = false;
  isError: boolean = false;
  isShowModal: boolean = false;
  currentUser!: User;
  trashIconSVG:string = this.sanitizer.bypassSecurityTrustHtml(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"></path></svg>`) as string;
  checkIconSVG:string = this.sanitizer.bypassSecurityTrustHtml(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>`)as string
  editIconSVG:string = this.sanitizer.bypassSecurityTrustHtml(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" /></svg>`)as string

  private userLog = inject(UserLogService);
  private profileProviderService = inject(ProfileProviderService);
  private backAccountProviderService = inject(BackAccountProviderService);

  ngOnInit(): void {
    this.isLoading = true;
    this.isError = false;
    this.recoverUserInfo();
  }

  goToDelete: Function = () => {
    this.isShowModal = !this.isShowModal;
  }

  goToEdit:Function = () => {
    this.isEdit = !this.isEdit;
  }

  goToSave:Function = () => {
    this.isEdit = false;
    this.isError = false;
    this.isLoading = true;
    console.log(this.currentUser)
    const onlyBiografyUser: User = {
      first_name: this.currentUser.first_name,
      last_name: this.currentUser.last_name
    }
    this.profileProviderService.updateUser(onlyBiografyUser).subscribe({
      next: ((newUserRecovered: User) => {
        console.log('Utente aggiornato con successo:', newUserRecovered);
        this.isError = false;
        this.isLoading = false;
      }),
      error: (err => {
        console.error('Si è verificato un errore durante l\'aggiornamento dell\'utente:', err);
        this.isError = true;
        this.isLoading = false;
      })
    })

    //todo by backend
    /*this.backAccountService.massiveUpdateBankAccountByUser(this.currentUser.bank_accounts as BankAccount[]).subscribe({
      next: ((newBankAccountRecovered: BankAccount[]) => {
        console.log('Conti bancari aggiornati con successo:', newBankAccountRecovered);
        this.isError = false;
        this.isLoading = false;
      }),
      error: (err => {
        console.error('Si è verificato un errore durante l\'aggiornamento dei conti bancari dell\' utente:', err);
        this.isError = true;
        this.isLoading = false;
      })
    })*/
  }

  // Arrow function - può essere usata come lambda
  onConfirmDelete = () => {
    this.isLoading = true;
    this.isError = false;

    this.profileProviderService.deleteUser().subscribe({
      next: (uuidDelete: string) => {
        console.log('Utente cancellato con successo:', uuidDelete);
        this.isError = false;
        this.isLoading = false;
        this.isShowModal = false;
        this.userLog.clearUuidUser();
        window.location.reload();
      },
      error: (err) => {
        console.error('Si è verificato un errore durante la fase di eliminazione:', err);
        this.isError = true;
        this.isLoading = false;
      }
    });
  }

  private recoverUserInfo(){
    this.profileProviderService.getUser().subscribe({
      next: (userRecovered: User) => {
        console.log('Utente recuperato con successo:', userRecovered);
        this.currentUser = userRecovered;
        this.recoverBankAccountsByUser();
      },
      error: (err) => {
        console.error('Si è verificato un errore durante il recupero delle informazioni:', err);
        this.isLoading = false;
        this.isError = true;
      }
    });
  }

  private recoverBankAccountsByUser() {
    this.backAccountProviderService.getBankAccountByUser().subscribe({
      next: (banksAccountRecovered: BankAccount[]) => {
        console.log('Bank account recuperato:', banksAccountRecovered);
        this.currentUser.bank_accounts = banksAccountRecovered;
        this.isLoading = false;
        this.isError = false;
      },
      error: (err) => {
        console.error('Errore recupero bank account:', err);
        this.isLoading = false;
        this.isError = true;
      }
    });
  }
}