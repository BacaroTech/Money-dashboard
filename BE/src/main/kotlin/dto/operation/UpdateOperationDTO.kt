package mft.dev.dto.operation

import kotlinx.serialization.Contextual
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable
import mft.dev.enums.OperationCategory
import java.time.LocalDate

@Serializable
data class UpdateOperationDTO(
    @SerialName("category")
    val category: OperationCategory?,
    @SerialName("amount")
    val amount: Int?,
    @SerialName("description")
    val description: String?,
    @SerialName("date")
    @Contextual
    val date: LocalDate?
)
