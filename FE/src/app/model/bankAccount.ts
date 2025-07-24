import { BankType } from "../enum/backEnum"

export type BankAccount = {
    uuid?: string,
    name: string,
    type: BankType,
    amount: number
}

