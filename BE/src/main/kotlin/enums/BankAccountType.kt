package mft.dev.enums

import kotlinx.serialization.Serializable

@Serializable
enum class BankAccountType {
    DIGITAL,
    CASH
}