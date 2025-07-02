package mft.dev.dto

import kotlinx.serialization.Required
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
data class UserDTO(
    @SerialName("first_name")
    @Required
    val firstName: String,
    @SerialName("last_name")
    @Required
    val lastName: String
)
