import { BankTypeEnum } from "../enum/bankEnum"

export type FilterOperations = {
    startDate?: Date,
    endDate?: Date,
    typeBankAccount?: BankTypeEnum
    bankAccountUuid?: string
}