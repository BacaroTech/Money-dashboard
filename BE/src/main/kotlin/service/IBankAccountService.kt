package mft.dev.service

import mft.dev.dto.bankaccount.BankAccountDTO
import mft.dev.dto.bankaccount.InsertBankAccountDTO
import mft.dev.dto.bankaccount.UpdateBankAccountDTO
import java.util.UUID

interface IBankAccountService {
    suspend fun insert(userUuid: UUID, dto: InsertBankAccountDTO): UUID?

    suspend fun getByUserUuid(userUuid: UUID): List<BankAccountDTO>?

    suspend fun delete(userUuid: UUID, uuid: UUID): Int?

    suspend fun update(userUuid: UUID, uuid: UUID, dto: UpdateBankAccountDTO): BankAccountDTO?
}