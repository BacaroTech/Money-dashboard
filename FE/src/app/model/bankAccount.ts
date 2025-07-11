import { BankType } from "../enum/backEnum"

export type BankAccount = {
    name: string,
    type: BankType,
    amount: number
}

