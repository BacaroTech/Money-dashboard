package mft.dev.routing

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.plugins.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import mft.dev.dto.user.InsertUserDTO
import mft.dev.dto.user.LoginDTO
import mft.dev.dto.user.UpdateUserDTO
import mft.dev.dto.user.UserDTO
import mft.dev.service.impl.UserService
import org.koin.ktor.ext.inject
import java.util.UUID

fun Application.configureUserRouting() {
    val userService: UserService by inject()

    routing {
        route("/users") {
            post("/register") {
                val dto: InsertUserDTO = call.receive<InsertUserDTO>()

                if (dto.email != dto.confirmEmail) throw BadRequestException("Email and Confirm email must be equals")

                dto.bankAccountDTO?.forEach {
                    if (it.amount <= 0) throw BadRequestException("Amount must be positive")
                }

                val response: UUID = userService.insert(dto)

                return@post call.respond(HttpStatusCode.OK, response.toString())
            }

            post("/login") {
                val dto: LoginDTO = call.receive<LoginDTO>()

                val response: UUID? = userService.login(dto)

                return@post response?.let {
                    call.respond(HttpStatusCode.OK, it.toString())
                } ?: call.respond(HttpStatusCode.Forbidden, "Authentication failed")
            }

            get {
                val authHeader = call.request.headers["uuid"] ?: throw BadRequestException("Missing uuid")
                val uuid = try {
                    UUID.fromString(authHeader)
                } catch (e: IllegalArgumentException) {
                    throw BadRequestException("Invalid uuid")
                }
                val response: UserDTO? = userService.get(uuid)

                return@get response?.let {
                    call.respond(HttpStatusCode.OK, it)
                } ?: call.respond(HttpStatusCode.Forbidden, "Access denied")
            }

            delete {
                val authHeader = call.request.headers["uuid"] ?: throw BadRequestException("Missing uuid")
                val uuid = try {
                    UUID.fromString(authHeader)
                } catch (e: IllegalArgumentException) {
                    throw BadRequestException("Invalid uuid")
                }
                val response: Int = userService.delete(uuid)

                return@delete if (response == 1) {
                    call.respond(HttpStatusCode.OK, "User deleted")
                } else {
                    call.respond(HttpStatusCode.Forbidden, "Access denied")
                }
            }

            put {
                val authHeader = call.request.headers["uuid"] ?: throw BadRequestException("Missing uuid")
                val uuid = try {
                    UUID.fromString(authHeader)
                } catch (e: IllegalArgumentException) {
                    throw BadRequestException("Invalid uuid")
                }

                val dto: UpdateUserDTO = call.receive<UpdateUserDTO>()

                val response: UserDTO? = userService.update(uuid, dto)

                return@put response?.let {
                    call.respond(HttpStatusCode.OK, it)
                } ?: call.respond(HttpStatusCode.Forbidden, "Access denied")
            }
        }
    }
}