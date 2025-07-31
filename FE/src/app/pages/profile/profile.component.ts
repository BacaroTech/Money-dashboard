import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ErrorMessageLabelComponent } from "src/app/components/error-message-label/error-message-label.component";
import { LoaderComponent } from "src/app/components/loader/loader.component";
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { BankTypeEnum} from 'src/app/enum/bankEnum';
import { BankAccount } from 'src/app/model/bankAccount';
import { User } from 'src/app/model/user';
import { BackAccountProviderService } from 'src/app/provider/back-account.provider';
import { ProfileProviderService } from 'src/app/provider/profile.provider';
import { UserLogService } from 'src/app/services/user-log.service';
import { BankListComponent } from "src/app/components/bank-list/bank-list.component";
import { DomSanitizer } from '@angular/platform-browser';
import { ButtonComponent } from "src/app/components/button/button.component";
import { IconsSVGService } from 'src/app/services/icons-svg.service';
import { IconsSVGEnum } from 'src/app/enum/IconsSVGEnum';
import { BackendResponce } from 'src/app/model/responce';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  standalone: true,
  imports: [ErrorMessageLabelComponent, LoaderComponent, CommonModule, ModalComponent, FormsModule, BankListComponent, ButtonComponent]
})
export class ProfileComponent implements OnInit {

  isEdit: boolean = false;
  isLoading: boolean = false;
  isError: boolean = false;
  isShowModal: boolean = false;
  currentUser!: User;
  errorMessage: string = "";

  private userLog = inject(UserLogService);
  private profileProviderService = inject(ProfileProviderService);
  private backAccountProviderService = inject(BackAccountProviderService);
  private iconsSVGService: IconsSVGService = inject(IconsSVGService);

  checkIconSVG: string = this.iconsSVGService.getMapIcons(IconsSVGEnum.check);
  trashIconSVG: string = this.iconsSVGService.getMapIcons(IconsSVGEnum.trash);
  editIconSVG: string = this.iconsSVGService.getMapIcons(IconsSVGEnum.edit);
  IconsSVGEnum = IconsSVGEnum;

  constructor() { }

  ngOnInit(): void {
    this.isLoading = true;
    this.isError = false;
    this.recoverUserInfo();
  }

  goToDelete: Function = () => {
    this.isShowModal = true;
  }

  goToEdit: Function = () => {
    this.isEdit = !this.isEdit;
  }

  goToSave: Function = () => {
    this.isEdit = false;
    this.isError = false;
    this.isLoading = true;

    const onlyBiografyUser: User = {
      first_name: this.currentUser.first_name,
      last_name: this.currentUser.last_name,
    }

    this.profileProviderService.updateUser(onlyBiografyUser).subscribe({
      next: ((backendResponce: BackendResponce<User>) => {
        console.log(backendResponce.message, backendResponce.content);
        this.isError = false;
        this.isLoading = false;

        this.backAccountProviderService.massiveUpdateBankAccountByUser(this.currentUser.bank_accounts as BankAccount[]).subscribe({
          next: ((newBankAccountRecovered: BackendResponce<BankAccount[]>) => {
            console.log(backendResponce.message, newBankAccountRecovered.content);
            this.isError = false;
            this.isLoading = false;
          }),
          error: ((err: BackendResponce<BankAccount[]>) => {
            this.badApiCall(err);
          })
        })

      }),
      error: ((err: BackendResponce<User>) => {
        this.badApiCall(err);
      })
    })

    
  }

  // Arrow function - può essere usata come lambda
  onConfirmDelete = () => {
    this.isLoading = true;
    this.isError = false;

    this.profileProviderService.deleteUser().subscribe({
      next: (backendResponce: BackendResponce<string>) => {
        console.log(backendResponce.message, backendResponce.content);
        this.isError = false;
        this.isLoading = false;
        this.isShowModal = false;
        this.userLog.clearUuidUser();
        window.location.reload();
      },
      error: (err: BackendResponce<string>) => {
        this.badApiCall(err);
      }
    });
  }

  onCloseModal:Function = () => {
    this.isShowModal = false;
  }

  private recoverUserInfo() {
    this.profileProviderService.getUser().subscribe({
      next: (backendResponce: BackendResponce<User>) => {
        console.log(backendResponce.message, backendResponce.content);
        this.currentUser = backendResponce.content!;
        this.recoverBankAccountsByUser();
      },
      error: (err: BackendResponce<User>) => {
        this.badApiCall(err);
      }
    });
  }

  private recoverBankAccountsByUser() {
    this.backAccountProviderService.getBankAccountByUser().subscribe({
      next: (backendResponce: BackendResponce<BankAccount[]>) => {
        console.log(backendResponce.message, backendResponce.content);
        this.currentUser.bank_accounts = backendResponce.content;
        this.isLoading = false;
        this.isError = false;
      },
      error: (err: BackendResponce<BankAccount[]>) => {
        this.badApiCall(err);
      }
    });
  }

  private badApiCall(err: BackendResponce<any>){
    this.errorMessage = err.message;
    console.error(this.errorMessage, err);
    this.isError = true;
    this.isLoading = false;
  }
}