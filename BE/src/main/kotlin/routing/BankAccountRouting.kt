package mft.dev.routing

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.plugins.*
import io.ktor.server.request.*
import io.ktor.server.routing.*
import mft.dev.dto.bankaccount.BankAccountDTO
import mft.dev.dto.bankaccount.InsertBankAccountDTO
import mft.dev.dto.bankaccount.UpdateBankAccountDTO
import mft.dev.response.respondError
import mft.dev.response.respondSuccess
import mft.dev.service.impl.BankAccountService
import org.koin.ktor.ext.inject
import java.util.*

fun Application.configureBankAccountRouting() {
    val bankAccountService: BankAccountService by inject()

    routing {
        route("/bank-accounts") {
            post {
                val authHeader = call.request.headers["uuid"] ?: throw BadRequestException("Missing uuid")
                val userUuid = try {
                    UUID.fromString(authHeader)
                } catch (e: IllegalArgumentException) {
                    throw BadRequestException("Invalid uuid")
                }

                val dto: InsertBankAccountDTO = call.receive<InsertBankAccountDTO>()

                val response: UUID? = bankAccountService.insert(userUuid, dto)

                return@post response?.let {
                    call.respondSuccess("Insert bank account succeeded", it.toString())
                } ?: call.respondError(HttpStatusCode.Forbidden, "Access denied")
            }

            get {
                val authHeader = call.request.headers["uuid"] ?: throw BadRequestException("Missing uuid")
                val userUuid = try {
                    UUID.fromString(authHeader)
                } catch (e: IllegalArgumentException) {
                    throw BadRequestException("Invalid uuid")
                }

                val response: List<BankAccountDTO>? = bankAccountService.getByUserUuid(userUuid)

                return@get response?.let {
                    call.respondSuccess("Find bank account succeeded", it)
                } ?: call.respondError(HttpStatusCode.Forbidden, "Access denied")
            }

            delete("/{uuid}") {
                val authHeader = call.request.headers["uuid"] ?: throw BadRequestException("Missing uuid")
                val pathVariable = call.pathParameters["uuid"] ?: throw BadRequestException("Missing uuid")
                val userUuid: UUID
                val bankAccountUuid: UUID

                try {
                    userUuid = UUID.fromString(authHeader)
                    bankAccountUuid = UUID.fromString(pathVariable)
                } catch (e: IllegalArgumentException) {
                    throw BadRequestException("Invalid uuid")
                }

                val response: Int? = bankAccountService.delete(userUuid, bankAccountUuid)

                return@delete response?.let {
                    if (it == 1) {
                        call.respondSuccess<Unit>( "Bank Account deleted")
                    }
                    else {
                        call.respondError(HttpStatusCode.NotFound, "Bank Account not found")
                    }
                } ?: call.respondError(HttpStatusCode.Forbidden, "Access denied")
            }

            put("/{uuid}") {
                val authHeader = call.request.headers["uuid"] ?: throw BadRequestException("Missing uuid")
                val pathVariable = call.pathParameters["uuid"] ?: throw BadRequestException("Missing uuid")
                val userUuid: UUID
                val bankAccountUuid: UUID

                try {
                    userUuid = UUID.fromString(authHeader)
                    bankAccountUuid = UUID.fromString(pathVariable)
                } catch (e: IllegalArgumentException) {
                    throw BadRequestException("Invalid uuid")
                }

                val dto: UpdateBankAccountDTO = call.receive<UpdateBankAccountDTO>()

                val response: BankAccountDTO? = bankAccountService.update(userUuid, bankAccountUuid, dto)

                return@put response?.let {
                    call.respondSuccess("Update bank account succeeded", it)
                } ?: call.respondError(HttpStatusCode.Forbidden, "Access denied")
            }

            put("/many") {
                val authHeader = call.request.headers["uuid"] ?: throw BadRequestException("Missing uuid")

                val userUuid: UUID
                try {
                    userUuid = UUID.fromString(authHeader)
                } catch (e: IllegalArgumentException) {
                    throw BadRequestException("Invalid uuid")
                }

                val dto: List<UpdateBankAccountDTO> = call.receive<List<UpdateBankAccountDTO>>()

                val response: List<BankAccountDTO>? = bankAccountService.updateMany(userUuid, dto)

                return@put response?.let {
                    call.respondSuccess("Update bank accounts succeeded", it)
                } ?: call.respondError(HttpStatusCode.Forbidden, "Access denied")
            }
        }
    }
}