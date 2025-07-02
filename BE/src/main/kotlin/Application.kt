package mft.dev

import io.ktor.server.application.*
import mft.dev.configuration.configureDatabases
import mft.dev.configuration.configureFrameworks
import mft.dev.configuration.configureSerialization
import mft.dev.routing.configureUserRouting

fun main(args: Array<String>) {
    io.ktor.server.netty.EngineMain.main(args)
}

fun Application.module() {
    configureSerialization()
    configureDatabases()
    configureFrameworks()
    configureUserRouting()
}
