package mft.dev.dto.bankaccount

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable
import mft.dev.enums.BankAccountType

@Serializable
data class UpdateBankAccountDTO(
    @SerialName("name")
    val name: String?,
    @SerialName("type")
    val type: BankAccountType?
)
