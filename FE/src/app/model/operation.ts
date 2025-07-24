import { OperationEnum } from "../enum/operationEnum"

type Operation = {
    uuid?: string
    amount: number,
    description: string,
    category: OperationEnum,
    date: Date,
}

export {Operation}