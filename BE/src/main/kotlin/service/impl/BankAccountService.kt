package mft.dev.service.impl

import kotlinx.coroutines.Dispatchers
import mft.dev.dto.bankaccount.BankAccountDTO
import mft.dev.dto.bankaccount.InsertBankAccountDTO
import mft.dev.dto.bankaccount.UpdateBankAccountDTO
import mft.dev.entity.BankAccountEntity
import mft.dev.entity.UserEntity
import mft.dev.mapper.toBankAccountDTO
import mft.dev.service.IBankAccountService
import mft.dev.table.BankAccountTable
import mft.dev.table.UserTable
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.and
import org.jetbrains.exposed.sql.transactions.experimental.newSuspendedTransaction
import java.time.LocalDateTime
import java.util.*

class BankAccountService(private val userService: UserService) : IBankAccountService {
    override suspend fun insert(userUuid: UUID, dto: InsertBankAccountDTO): UUID? =
        dbQuery {
            val user: UserEntity? = userService.getUserEntityByUuid(userUuid)

            user?.let {
                BankAccountEntity.new {
                    name = dto.name
                    type = dto.type
                    userEntity = user
                }.uuid
            }
        }

    override suspend fun getByUserUuid(userUuid: UUID): List<BankAccountDTO>? =
        dbQuery {
            val user: UserEntity? = userService.getUserEntityByUuid(userUuid)

            user?.let {
                BankAccountEntity.find {
                    BankAccountTable.userId eq it.id
                }.map {
                    it.toBankAccountDTO()
                }
            }
        }

    override suspend fun delete(userUuid: UUID, uuid: UUID): Int? =
        dbQuery {
            val user: UserEntity? = userService.getUserEntityByUuid(userUuid)

            user?.let {
                val bankAccount = BankAccountEntity.find {
                    (BankAccountTable.userId eq it.id) and (BankAccountTable.uuid eq uuid)
                }.singleOrNull()

                return@dbQuery bankAccount?.let {
                    it.delete()
                    1
                } ?: 0
            }
        }

    override suspend fun update(userUuid: UUID, uuid: UUID, dto: UpdateBankAccountDTO): BankAccountDTO? =
        dbQuery {
            val user: UserEntity? = userService.getUserEntityByUuid(userUuid)

            user?.let {
                BankAccountEntity.findSingleByAndUpdate(BankAccountTable.uuid eq uuid) { bankAccount ->
                    dto.name?.let { bankAccount.name = it }
                    dto.type?.let { bankAccount.type = it }
                    bankAccount.lastUpdate = LocalDateTime.now()
                }?.toBankAccountDTO()
            }
        }

    internal suspend fun getBankAccountByUuid(userUuid: UUID, bankAccountUuid: UUID): BankAccountEntity? =
        dbQuery {
            val user: UserEntity? = userService.getUserEntityByUuid(userUuid)

            return@dbQuery user?.let {
                BankAccountEntity.find {
                    (BankAccountTable.userId eq user.id) and (BankAccountTable.uuid eq bankAccountUuid)
                }.singleOrNull()
            }
        }

    private suspend fun <T> dbQuery(block: suspend () -> T): T =
        newSuspendedTransaction(Dispatchers.IO) { block() }
}