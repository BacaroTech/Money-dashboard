import { Operation } from "./operation"

export type MultipleOperations = {
    items: Operation[],
    total_pages: number,
    total_count: number,
    page_size: number,
    page_number: number
}