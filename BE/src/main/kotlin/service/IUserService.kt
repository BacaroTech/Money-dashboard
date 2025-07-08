package mft.dev.service

import mft.dev.dto.user.InsertUserDTO
import mft.dev.dto.user.LoginDTO
import mft.dev.dto.user.UpdateUserDTO
import mft.dev.dto.user.UserDTO
import java.util.UUID

interface IUserService {
    suspend fun insert(dto: InsertUserDTO): UUID

    suspend fun login(dto: LoginDTO): UUID?

    suspend fun get(uuid: UUID): UserDTO?

    suspend fun delete(uuid: UUID): Int?

    suspend fun update(uuid: UUID, dto: UpdateUserDTO): UserDTO?
}