package mft.dev.service.impl

import kotlinx.coroutines.Dispatchers
import mft.dev.dto.operation.InsertOperationDTO
import mft.dev.dto.operation.OperationDTO
import mft.dev.dto.operation.UpdateOperationDTO
import mft.dev.entity.BankAccountEntity
import mft.dev.entity.OperationEntity
import mft.dev.mapper.toOperationDTO
import mft.dev.service.IOperationService
import mft.dev.table.OperationTable
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.and
import org.jetbrains.exposed.sql.transactions.experimental.newSuspendedTransaction
import java.util.*

class OperationService(private val bankAccountService: BankAccountService) : IOperationService {
    override suspend fun insert(userUuid: UUID, bankAccountUuid: UUID, dto: InsertOperationDTO): UUID? =
        dbQuery {
            val bankAccount: BankAccountEntity? = bankAccountService.getBankAccountByUuid(userUuid, bankAccountUuid)

            bankAccount?.let {
                OperationEntity.new {
                    category = dto.category
                    amount = dto.amount
                    description = dto.description
                    date = dto.date
                }.id.value
            }
        }

    override suspend fun getByBankAccountUuid(userUuid: UUID, bankAccountUuid: UUID): List<OperationDTO>? =
        dbQuery {
            val bankAccount: BankAccountEntity? = bankAccountService.getBankAccountByUuid(userUuid, bankAccountUuid)

            bankAccount?.let {
                OperationEntity.find {
                    OperationTable.bankAccountId eq bankAccount.id
                }.map { it.toOperationDTO() }
            }
        }

    override suspend fun getByUuid(userUuid: UUID, bankAccountUuid: UUID, uuid: UUID): OperationDTO? =
        dbQuery {
            val bankAccount: BankAccountEntity? = bankAccountService.getBankAccountByUuid(userUuid, bankAccountUuid)

            bankAccount?.let {
                OperationEntity.find {
                    (OperationTable.bankAccountId eq bankAccount.id) and (OperationTable.id eq uuid)
                }.map { it.toOperationDTO() }.singleOrNull()
            }
        }

    override suspend fun update(userUuid: UUID, bankAccountUuid: UUID, uuid: UUID, dto: UpdateOperationDTO): OperationDTO? =
        dbQuery {
            val bankAccount: BankAccountEntity? = bankAccountService.getBankAccountByUuid(userUuid, bankAccountUuid)

            bankAccount?.let {
                OperationEntity.findSingleByAndUpdate(
                    (OperationTable.bankAccountId eq bankAccount.id) and (OperationTable.id eq uuid)
                ) { operation ->
                    dto.category?.let { operation.category = it  }
                    dto.amount?.let { operation.amount = it  }
                    dto.description?.let { operation.description = it  }
                    dto.date?.let { operation.date = it  }
                }?.toOperationDTO()
            }
        }

    override suspend fun delete(userUuid: UUID, bankAccountUuid: UUID, uuid: UUID): Int? =
        dbQuery {
            val bankAccount: BankAccountEntity? = bankAccountService.getBankAccountByUuid(userUuid, bankAccountUuid)

            bankAccount?.let {
                val operation = OperationEntity.find {
                    (OperationTable.bankAccountId eq bankAccount.id) and (OperationTable.id eq uuid)
                }.singleOrNull()

                operation?.let {
                    it.delete()
                    1
                } ?: 0
            }
        }

    private suspend fun <T> dbQuery(block: suspend () -> T): T =
        newSuspendedTransaction(Dispatchers.IO) { block() }
}