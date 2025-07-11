import { BankAccount } from "./bankAccount";

export type Register = {
    email: string,
    confirm_email: string,
    password: string,
    first_name: string,
    last_name: string,
    bank_account: BankAccount[];
}