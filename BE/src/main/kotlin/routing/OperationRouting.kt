package mft.dev.routing

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.plugins.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import mft.dev.dto.operation.InsertOperationDTO
import mft.dev.dto.operation.OperationDTO
import mft.dev.dto.operation.UpdateOperationDTO
import mft.dev.dto.utils.PaginationDTO
import mft.dev.service.impl.OperationService
import org.koin.ktor.ext.inject
import java.util.*

fun Application.configureOperationRouting() {
    val operationService: OperationService by inject()

    routing {
        route("/operations") {
            post("/bank-account/{bankAccountUuid}") {
                val authHeader = call.request.headers["uuid"] ?: throw BadRequestException("Missing uuid")
                val pathVariable = call.pathParameters["bankAccountUuid"] ?: throw BadRequestException("Missing uuid")
                val userUuid: UUID
                val bankAccountUuid: UUID

                try {
                    userUuid = UUID.fromString(authHeader)
                    bankAccountUuid = UUID.fromString(pathVariable)
                } catch (e: IllegalArgumentException) {
                    throw BadRequestException("Invalid uuid")
                }

                val dto: InsertOperationDTO = call.receive<InsertOperationDTO>()

                val response: UUID? = operationService.insert(userUuid, bankAccountUuid, dto)

                return@post response?.let {
                    call.respond(HttpStatusCode.OK, it.toString())
                } ?: call.respond(HttpStatusCode.Forbidden, "Access Denied")

            }

            get("/bank-account/{bankAccountUuid}") {
                val authHeader = call.request.headers["uuid"] ?: throw BadRequestException("Missing uuid")
                val pathVariable = call.pathParameters["bankAccountUuid"] ?: throw BadRequestException("Missing uuid")
                val pageNumberString = call.queryParameters["pageNumber"] ?: "1"
                val pageSizeString = call.queryParameters["pageSize"] ?: "10"
                val userUuid: UUID
                val bankAccountUuid: UUID
                val pageNumber: Int
                val pageSize: Int

                try {
                    userUuid = UUID.fromString(authHeader)
                    bankAccountUuid = UUID.fromString(pathVariable)
                } catch (e: IllegalArgumentException) {
                    throw BadRequestException("Invalid uuid")
                }

                try {
                    pageNumber = pageNumberString.toInt()
                    pageSize = pageSizeString.toInt()
                } catch (e: NumberFormatException) {
                    throw BadRequestException("Invalid page number / page size")
                }

                val response: PaginationDTO<OperationDTO>? = operationService.getByBankAccountUuid(userUuid, bankAccountUuid, pageNumber, pageSize)

                return@get response?.let {
                    call.respond(HttpStatusCode.OK, it)
                } ?: call.respond(HttpStatusCode.Forbidden, "Access Denied")
            }

            get("/{uuid}/bank-account/{bankAccountUuid}") {
                val authHeader = call.request.headers["uuid"] ?: throw BadRequestException("Missing uuid")
                val pathVariableBankAccount =
                    call.pathParameters["bankAccountUuid"] ?: throw BadRequestException("Missing uuid")
                val pathVariableOperation = call.pathParameters["uuid"] ?: throw BadRequestException("Missing uuid")
                val userUuid: UUID
                val bankAccountUuid: UUID
                val operationUuid: UUID

                try {
                    userUuid = UUID.fromString(authHeader)
                    bankAccountUuid = UUID.fromString(pathVariableBankAccount)
                    operationUuid = UUID.fromString(pathVariableOperation)
                } catch (e: IllegalArgumentException) {
                    throw BadRequestException("Invalid uuid")
                }

                val response: OperationDTO? = operationService.getByUuid(userUuid, bankAccountUuid, operationUuid)

                return@get response?.let {
                    call.respond(HttpStatusCode.OK, it)
                } ?: call.respond(HttpStatusCode.Forbidden, "Access Denied")
            }

            put("/{uuid}/bank-account/{bankAccountUuid}") {
                val authHeader = call.request.headers["uuid"] ?: throw BadRequestException("Missing uuid")
                val pathVariableBankAccount = call.pathParameters["bankAccountUuid"] ?: throw BadRequestException("Missing uuid")
                val pathVariableOperation = call.pathParameters["uuid"] ?: throw BadRequestException("Missing uuid")
                val userUuid: UUID
                val bankAccountUuid: UUID
                val operationUuid: UUID

                try {
                    userUuid = UUID.fromString(authHeader)
                    bankAccountUuid = UUID.fromString(pathVariableBankAccount)
                    operationUuid = UUID.fromString(pathVariableOperation)
                } catch (e: IllegalArgumentException) {
                    throw BadRequestException("Invalid uuid")
                }

                val dto: UpdateOperationDTO = call.receive<UpdateOperationDTO>()

                val response: OperationDTO? = operationService.update(userUuid, bankAccountUuid, operationUuid, dto)

                return@put response?.let {
                    call.respond(HttpStatusCode.OK, it)
                } ?: call.respond(HttpStatusCode.Forbidden, "Access Denied")
            }

            delete("/{uuid}/bank-account/{bankAccountUuid}") {
                val authHeader = call.request.headers["uuid"] ?: throw BadRequestException("Missing uuid")
                val pathVariableBankAccount = call.pathParameters["bankAccountUuid"] ?: throw BadRequestException("Missing uuid")
                val pathVariableOperation = call.pathParameters["uuid"] ?: throw BadRequestException("Missing uuid")
                val userUuid: UUID
                val bankAccountUuid: UUID
                val operationUuid: UUID

                try {
                    userUuid = UUID.fromString(authHeader)
                    bankAccountUuid = UUID.fromString(pathVariableBankAccount)
                    operationUuid = UUID.fromString(pathVariableOperation)
                } catch (e: IllegalArgumentException) {
                    throw BadRequestException("Invalid uuid")
                }

                val response: Int? = operationService.delete(userUuid, bankAccountUuid, operationUuid)

                return@delete response?.let {
                    if (response == 1) {
                        call.respond(HttpStatusCode.OK, "Operation deleted")
                    }
                    else {
                        call.respond(HttpStatusCode.NotFound, "Operation not found")
                    }
                } ?: call.respond(HttpStatusCode.Forbidden, "Access Denied")
            }
        }
    }

}