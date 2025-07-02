package mft.dev.routing

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.plugins.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import mft.dev.dto.InsertUserDTO
import mft.dev.dto.LoginDTO
import mft.dev.dto.UserDTO
import mft.dev.service.IUserService
import org.koin.ktor.ext.inject
import java.util.UUID

fun Application.configureUserRouting() {
    val userService: IUserService by inject()

    routing {
        route("/users") {
            post("/register") {
                val dto: InsertUserDTO = call.receive<InsertUserDTO>()

                val response: UUID = userService.insert(dto)

                return@post call.respond(HttpStatusCode.OK, response.toString())
            }

            post("/login") {
                val dto: LoginDTO = call.receive<LoginDTO>()

                val response: UUID? = userService.login(dto)

                return@post response?.let {
                    call.respond(HttpStatusCode.OK, response.toString())
                } ?: call.respond(HttpStatusCode.Forbidden, "Authentication failed")
            }

            get {
                val authHeader = call.request.headers["uuid"] ?: throw BadRequestException("Missing uuid")
                val uuid = try {
                    UUID.fromString(authHeader)
                } catch (e: IllegalArgumentException) {
                    throw BadRequestException("Invalid uuid")
                }
                val response: UserDTO? = userService.getUser(uuid)

                return@get response?.let {
                    call.respond(HttpStatusCode.OK, response)
                } ?: call.respond(HttpStatusCode.Forbidden, "Authentication failed")
            }

        }
    }
}