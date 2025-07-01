package mft.dev.table

import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.IntIdTable
import org.jetbrains.exposed.sql.Column
import org.jetbrains.exposed.sql.ReferenceOption
import org.jetbrains.exposed.sql.javatime.date
import java.time.LocalDate
import java.util.*

object BankAccountTable : IntIdTable(name = "bank_accounts")  {
    val uuid: Column<UUID> = uuid(name = "uuid").autoGenerate().uniqueIndex()
    val name: Column<String> = varchar(name = "name", length = 128)
    val type: Column<String> = varchar(name = "type", length = 128) //todo enum to manage if it is digital or cash
    val creationDate: Column<LocalDate> = date(name = "creation_date").default(LocalDate.now())
    val lastUpdate: Column<LocalDate> = date(name = "last_update").default(LocalDate.now())
    val userId: Column<EntityID<Int>> = reference("user_id", UserTable, onDelete = ReferenceOption.CASCADE)
}