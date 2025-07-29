import { BankTypeEnum } from "../enum/bankEnum"

export type BankAccount = {
    uuid?: string,
    name: string,
    type: BankTypeEnum,
    amount: number
}

