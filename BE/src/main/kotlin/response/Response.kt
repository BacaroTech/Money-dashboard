package mft.dev.response

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.response.*
import mft.dev.dto.response.ErrorResponse
import mft.dev.dto.response.SuccessResponse

suspend inline fun <reified T> ApplicationCall.respondSuccess(message: String, content: T? = null) {
    respond(HttpStatusCode.OK, SuccessResponse(message = message, content = content))
}

suspend fun ApplicationCall.respondError(statusCode: HttpStatusCode, message: String) {
    respond(HttpStatusCode.InternalServerError, ErrorResponse(statusCode.value, message))
}