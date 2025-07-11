package mft.dev.dto.bankaccount

import kotlinx.serialization.Required
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable
import mft.dev.enums.BankAccountType

@Serializable
data class InsertBankAccountDTO(
    @SerialName("name")
    @Required
    val name: String,
    @SerialName("type")
    @Required
    val type: BankAccountType,
    @SerialName("amount")
    @Required
    val amount: Double
)
