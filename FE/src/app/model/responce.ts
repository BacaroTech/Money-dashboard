export type BackendResponce<E> = {
    statusCode: number,
    message: string,
    content?: E
}