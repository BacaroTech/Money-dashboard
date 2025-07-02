package mft.dev.service

import mft.dev.dto.InsertUserDTO
import mft.dev.dto.LoginDTO
import mft.dev.dto.UserDTO
import java.util.UUID

interface IUserService {
    suspend fun insert(dto: InsertUserDTO): UUID

    suspend fun login(dto: LoginDTO): UUID?

    suspend fun getUser(uuid: UUID): UserDTO?
}