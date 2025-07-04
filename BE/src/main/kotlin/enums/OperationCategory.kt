package mft.dev.enums

import kotlinx.serialization.Serializable

@Serializable
enum class OperationCategory {
    INCOMING,
    OUTCOMING
}