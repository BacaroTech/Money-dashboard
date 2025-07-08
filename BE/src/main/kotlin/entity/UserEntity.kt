package mft.dev.entity

import mft.dev.table.UserTable
import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID
import java.time.LocalDate
import java.time.LocalDateTime
import java.util.*

class UserEntity(id: EntityID<Int>) : IntEntity(id) {
    companion object : IntEntityClass<UserEntity>(UserTable)

    var uuid: UUID by UserTable.uuid
    var firstName: String by UserTable.firstName
    var lastName: String by UserTable.lastName
    var email: String by UserTable.email
    var password: String by UserTable.password
    var creationDate: LocalDate by UserTable.creationDate
    var lastUpdate: LocalDateTime by UserTable.lastUpdate
}