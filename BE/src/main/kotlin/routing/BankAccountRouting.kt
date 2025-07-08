package mft.dev.routing

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.plugins.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import mft.dev.dto.bankaccount.BankAccountDTO
import mft.dev.dto.bankaccount.InsertBankAccountDTO
import mft.dev.service.impl.BankAccountService
import org.koin.ktor.ext.inject
import java.util.*

fun Application.configureBankAccountRouting() {
    val bankAccountService: BankAccountService by inject()

    routing {
        route("/bank-account") {
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
                    call.respond(HttpStatusCode.OK, it.toString())
                } ?: call.respond(HttpStatusCode.Forbidden, "Access denied")
            }

            get {
                val authHeader = call.request.headers["uuid"] ?: throw BadRequestException("Missing uuid")
                val userUuid = try {
                    UUID.fromString(authHeader)
                } catch (e: IllegalArgumentException) {
                    throw BadRequestException("Invalid uuid")
                }

                val response: List<BankAccountDTO>? = bankAccountService.getByUserId(userUuid)

                return@get response?.let {
                    call.respond(HttpStatusCode.OK, it)
                } ?: call.respond(HttpStatusCode.Forbidden, "Access denied")
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
                        call.respond(HttpStatusCode.OK, "Bank Account deleted")
                    }
                    else {
                        call.respond(HttpStatusCode.NotFound, "Bank Account not found")
                    }
                } ?: call.respond(HttpStatusCode.Forbidden, "Access denied")
            }
        }
    }
}