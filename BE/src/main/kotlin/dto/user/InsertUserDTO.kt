package mft.dev.dto.user

import kotlinx.serialization.Required
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
data class InsertUserDTO(
    @SerialName("first_name")
    @Required
    val firstName: String,
    @SerialName("last_name")
    @Required
    val lastName: String,
    @SerialName("email")
    @Required
    val email: String,
    @SerialName("password")
    @Required
    val password: String
)
