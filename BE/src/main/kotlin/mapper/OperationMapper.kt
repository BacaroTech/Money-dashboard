package mft.dev.mapper

import mft.dev.dto.operation.OperationDTO
import mft.dev.entity.OperationEntity

fun OperationEntity.toOperationDTO(): OperationDTO {
    return OperationDTO(
        uuid = id.toString(),
        category = category,
        amount = amount,
        description = description,
        date = date
    )
}