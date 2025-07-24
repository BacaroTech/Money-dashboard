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

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  standalone: true,
  imports: [ErrorMessageLabelComponent, LoaderComponent, CommonModule, ModalComponent, FormsModule]
})
export class ProfileComponent implements OnInit {

  constructor() { }

  isEdit: boolean = false;
  isLoading: boolean = false;
  isError: boolean = false;
  isShowModal: boolean = false;
  currentUser!: User;

  private userLog = inject(UserLogService);
  private profileProviderService = inject(ProfileProviderService);
  private backAccountService = inject(BackAccountProviderService);

  ngOnInit(): void {
    this.isLoading = true;
    this.isError = false;
    this.recoverUserInfo();
  }

  goToDelete(): void {
    this.isShowModal = true;
  }

  goToEdit(): void {
    this.isEdit = true;
  }

  goToSave(): void {
    this.isEdit = false;
    this.isError = false;
    this.isLoading = true;
    const onlyBiografyUser: User = {
      first_name: this.currentUser.first_name,
      last_name: this.currentUser.last_name
    }
    this.profileProviderService.updateUser(this.userLog.getUuidUser(), onlyBiografyUser).subscribe({
      next: ((newUserRecovered: User) => {
        console.log('Usetente aggiornato con successo:', newUserRecovered);
        this.isError = false;
        this.isLoading = false;
      }),
      error: (err => {
        console.error('Si è verificato un errore durante l\'aggiornamento dell\'utente:', err);
        this.isError = true;
        this.isLoading = false;
      })
    })
  }

  // Arrow function - può essere usata come lambda
  onConfirmDelete = () => {
    this.isLoading = true;
    this.isError = false;

    this.profileProviderService.deleteUser(this.userLog.getUuidUser()).subscribe({
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
    this.profileProviderService.getUser(this.userLog.getUuidUser()).subscribe({
      next: (userRecovered: User) => {
        console.log('Utente recuperato con successo:', userRecovered);
        this.currentUser = userRecovered;
        this.recoverBanckAccountsByUser();
      },
      error: (err) => {
        console.error('Si è verificato un errore durante il recupero delle informazioni:', err);
        this.isLoading = false;
        this.isError = true;
      }
    });
  }

  private recoverBanckAccountsByUser() {
    this.backAccountService.getBanckAccountByUser(this.userLog.getUuidUser()).subscribe({
      next: (banksAccountRecovered: BankAccount[]) => {
        console.log('Bank account recuperato:', banksAccountRecovered);
        this.currentUser.banks_account = banksAccountRecovered;
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

  addBankAccount(){
    this.currentUser.banks_account?.push({
      name: '',
      type: BankType.CASH,
      amount: 0
    })
  }
}