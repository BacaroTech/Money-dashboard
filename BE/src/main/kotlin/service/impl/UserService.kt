package mft.dev.service.impl

import kotlinx.coroutines.Dispatchers
import mft.dev.dto.user.InsertUserDTO
import mft.dev.dto.user.LoginDTO
import mft.dev.dto.user.UpdateUserDTO
import mft.dev.dto.user.UserDTO
import mft.dev.entity.UserEntity
import mft.dev.mapper.toUserDTO
import mft.dev.service.IUserService
import mft.dev.table.UserTable
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.and
import org.jetbrains.exposed.sql.transactions.experimental.newSuspendedTransaction
import java.time.LocalDateTime
import java.util.*

class UserService : IUserService {
    override suspend fun insert(dto: InsertUserDTO): UUID =
        dbQuery {
            UserEntity.new {
                firstName = dto.firstName
                lastName = dto.lastName
                email = dto.email
                password = dto.password
            }.uuid
        }

    override suspend fun login(dto: LoginDTO): UUID? =
        dbQuery {
            UserEntity.find {
                (UserTable.email eq dto.email) and (UserTable.password eq dto.password)
            }.singleOrNull()?.uuid
        }

    override suspend fun get(uuid: UUID): UserDTO? =
        dbQuery {
            UserEntity.find {
                UserTable.uuid eq uuid
            }.singleOrNull()?.toUserDTO()
        }

    override suspend fun delete(uuid: UUID): Int =
        dbQuery {
            val user: UserEntity? = UserEntity.find {
                UserTable.uuid eq uuid
            }.singleOrNull()

            return@dbQuery user?.let {
                it.delete()
                1
            } ?: 0
        }

    override suspend fun update(uuid: UUID, dto: UpdateUserDTO): UserDTO? =
        dbQuery {
            UserEntity.findSingleByAndUpdate(UserTable.uuid eq uuid) { user ->
                dto.firstName?.let { user.firstName = it }
                dto.lastName?.let { user.lastName = it }
                user.lastUpdate = LocalDateTime.now()
            }?.toUserDTO()
        }

    internal suspend fun getUserEntityByUuid(uuid: UUID): UserEntity? =
        dbQuery {
            UserEntity.find {
                UserTable.uuid eq uuid
            }.singleOrNull()
        }

    private suspend fun <T> dbQuery(block: suspend () -> T): T =
        newSuspendedTransaction(Dispatchers.IO) { block() }
}