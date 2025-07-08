package mft.dev.dto.user

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
data class UpdateUserDTO(
    @SerialName("first_name")
    val firstName: String?,
    @SerialName("last_name")
    val lastName: String?
)
