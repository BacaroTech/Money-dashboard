import { OperationEnum } from "../enum/operationEnum"

export type FilterOperations = {
    startDate?: Date,
    endDate?: Date,
    typeOperation?: OperationEnum
}