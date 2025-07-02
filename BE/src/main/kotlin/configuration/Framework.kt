package mft.dev.configuration

import io.ktor.server.application.*
import mft.dev.service.IUserService
import mft.dev.service.impl.UserService
import org.koin.dsl.module
import org.koin.ktor.plugin.Koin

fun Application.configureFrameworks() {
    install(Koin) {
        modules(module {
            single<IUserService> { UserService() }
        })
    }
}
