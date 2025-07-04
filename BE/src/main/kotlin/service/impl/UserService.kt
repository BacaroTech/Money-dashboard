package mft.dev.service.impl

import kotlinx.coroutines.Dispatchers
import mft.dev.dto.user.InsertUserDTO
import mft.dev.dto.user.LoginDTO
import mft.dev.dto.user.UserDTO
import mft.dev.entity.UserEntity
import mft.dev.mapper.toUserDTO
import mft.dev.service.IUserService
import mft.dev.table.UserTable
import org.jetbrains.exposed.sql.and
import org.jetbrains.exposed.sql.transactions.experimental.newSuspendedTransaction
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

    override suspend fun getUser(uuid: UUID): UserDTO? =
        dbQuery {
            UserEntity.find {
                UserTable.uuid eq uuid
            }.singleOrNull()?.toUserDTO()
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