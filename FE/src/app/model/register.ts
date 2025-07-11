import { BanckAccount } from "./banckAccount";

export type Register = {
    mail: string,
    confirm_mail: string,
    psw: string,
    name: string,
    surname: string,
    bankAccount: BanckAccount[];
}