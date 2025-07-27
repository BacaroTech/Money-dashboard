package mft.dev.mapper

import mft.dev.dto.bankaccount.BankAccountDTO
import mft.dev.entity.BankAccountEntity

fun BankAccountEntity.toBankAccountDTO(amount: Double): BankAccountDTO {
    return BankAccountDTO(
        uuid = uuid.toString(),
        name = name,
        type = type,
        amount = amount
    )
}