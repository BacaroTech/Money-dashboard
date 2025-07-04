package mft.dev.dto.operation

import kotlinx.serialization.Contextual
import kotlinx.serialization.Required
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable
import mft.dev.enums.OperationCategory
import java.time.LocalDate

@Serializable
data class OperationDTO(
    @SerialName("uuid")
    @Required
    val uuid: String,
    @SerialName("category")
    @Required
    val category: OperationCategory,
    @SerialName("amount")
    @Required
    val amount: Int,
    @SerialName("description")
    val description: String?,
    @SerialName("date")
    @Required
    @Contextual
    val date: LocalDate
)
