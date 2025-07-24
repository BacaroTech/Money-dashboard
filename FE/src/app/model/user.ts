import { BankAccount } from "./bankAccount"

export type User = {
    first_name: string,
    last_name: string,
    banks_account?: BankAccount[]
}