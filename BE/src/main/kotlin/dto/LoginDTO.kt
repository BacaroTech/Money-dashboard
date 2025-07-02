package mft.dev.dto

import kotlinx.serialization.Required
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
data class LoginDTO(
    @SerialName("email")
    @Required
    val email: String,
    @SerialName("password")
    @Required
    val password: String
)
