package mft.dev.mapper

import mft.dev.dto.user.UserDTO
import mft.dev.entity.UserEntity

fun UserEntity.toUserDTO(): UserDTO {
    return UserDTO(
        firstName,
        lastName
    )
}