package mft.dev.mapper

import mft.dev.dto.UserDTO
import mft.dev.entity.UserEntity

fun UserEntity.toUserDTO(): UserDTO {
    return UserDTO(
        firstName,
        lastName
    )
}