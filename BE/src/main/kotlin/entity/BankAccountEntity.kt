package mft.dev.entity

import mft.dev.enums.BankAccountType
import mft.dev.table.BankAccountTable
import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID
import java.time.LocalDate
import java.time.LocalDateTime
import java.util.*

class BankAccountEntity(id: EntityID<Int>) : IntEntity(id) {
    companion object : IntEntityClass<BankAccountEntity>(BankAccountTable)

    var uuid: UUID by BankAccountTable.uuid
    var name: String by BankAccountTable.name
    var type: BankAccountType by BankAccountTable.type
    var amount: Double by BankAccountTable.amount
    var creationDate: LocalDate by BankAccountTable.creationDate
    var lastUpdate: LocalDateTime by BankAccountTable.lastUpdate
    var userEntity by UserEntity referencedOn BankAccountTable.userId
}