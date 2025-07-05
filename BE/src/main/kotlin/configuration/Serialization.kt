package mft.dev.configuration

import io.ktor.serialization.kotlinx.json.*
import io.ktor.server.application.*
import io.ktor.server.plugins.contentnegotiation.*
import kotlinx.serialization.json.Json
import kotlinx.serialization.modules.SerializersModule
import mft.dev.serializer.LocalDateSerializer
import java.time.LocalDate

fun Application.configureSerialization() {
    val customSerializers = SerializersModule {
        contextual(LocalDate::class, LocalDateSerializer)
    }

    install(ContentNegotiation) {
        json(Json {
            prettyPrint = true
            explicitNulls = false
            serializersModule = customSerializers
        })
    }
}
