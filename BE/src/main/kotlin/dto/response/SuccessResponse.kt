package mft.dev.dto.response

import kotlinx.serialization.Required
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
data class SuccessResponse<T>(
    @SerialName("status_code")
    @Required
    override val statusCode: Int = 200,
    @SerialName("message")
    @Required
    override val message: String,
    @SerialName("content")
    @Required
    val content: T
) : BaseResponse
