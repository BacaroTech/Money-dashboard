package mft.dev.dto.response

import kotlinx.serialization.Required
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
data class ErrorResponse(
    @SerialName("status_code")
    @Required
    override val statusCode: Int,
    @SerialName("message")
    @Required
    override val message: String
) : BaseResponse
