import { Operation } from "./operation"

export type MultipleOperations = {
    items: Operation[],
    totalPages: number,
    totalElements: number,
}