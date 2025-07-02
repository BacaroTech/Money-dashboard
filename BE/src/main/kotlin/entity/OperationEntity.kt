package mft.dev.entity

import mft.dev.enums.OperationCategory
import mft.dev.table.OperationTable
import org.jetbrains.exposed.dao.UUIDEntity
import org.jetbrains.exposed.dao.UUIDEntityClass
import org.jetbrains.exposed.dao.id.EntityID
import java.time.LocalDate
import java.time.LocalDateTime
import java.util.UUID

class OperationEntity(id: EntityID<UUID>) : UUIDEntity(id) {
    companion object : UUIDEntityClass<OperationEntity>(OperationTable)

    var category: OperationCategory by OperationTable.category
    var amount: Int by OperationTable.amount
    var description: String? by OperationTable.description
    var date: LocalDate by OperationTable.date
    var creationDate: LocalDate by OperationTable.creationDate
    var lastUpdate: LocalDateTime by OperationTable.lastUpdate
    val bankAccountEntity by BankAccountEntity referencedOn OperationTable.bankAccountId
}