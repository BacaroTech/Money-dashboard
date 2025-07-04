package mft.dev.service

import mft.dev.dto.operation.InsertOperationDTO
import mft.dev.dto.operation.OperationDTO
import mft.dev.dto.operation.UpdateOperationDTO
import java.util.UUID

interface IOperationService {
    suspend fun insert(userUuid: UUID, bankAccountUuid: UUID, dto: InsertOperationDTO): UUID?

    suspend fun getByBankAccountUuid(userUuid: UUID, bankAccountUuid: UUID): List<OperationDTO>?

    suspend fun getByUuid(userUuid: UUID, bankAccountUuid: UUID, uuid: UUID): OperationDTO?

    suspend fun update(userUuid: UUID, bankAccountUuid: UUID, uuid: UUID, dto: UpdateOperationDTO): OperationDTO?

    suspend fun delete(userUuid: UUID, bankAccountUuid: UUID, uuid: UUID): Int?
}