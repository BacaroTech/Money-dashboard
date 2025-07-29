import { BankAccount } from "./bankAccount"

export type User = {
    email?: string
    first_name: string,
    last_name: string,
    bank_accounts?: BankAccount[]
}