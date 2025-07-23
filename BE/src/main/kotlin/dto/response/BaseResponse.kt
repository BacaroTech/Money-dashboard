package mft.dev.dto.response

import kotlinx.serialization.Required
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
sealed interface BaseResponse {
    @SerialName("status_code")
    @Required
    val statusCode: Int
    @SerialName("message")
    @Required
    val message: String
}
