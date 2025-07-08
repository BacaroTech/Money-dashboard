import { BanckAccount } from "./banckAccount";

export type Register = {
    mail1: string,
    mail2: string,
    psw: string,
    name: string,
    surname: string,
    bankAccount: BanckAccount[];
}