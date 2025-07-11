package mft.dev.table

import mft.dev.enums.BankAccountType
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.IntIdTable
import org.jetbrains.exposed.sql.Column
import org.jetbrains.exposed.sql.ReferenceOption
import org.jetbrains.exposed.sql.javatime.CurrentDate
import org.jetbrains.exposed.sql.javatime.CurrentDateTime
import org.jetbrains.exposed.sql.javatime.date
import org.jetbrains.exposed.sql.javatime.datetime
import java.time.LocalDate
import java.time.LocalDateTime
import java.util.*

object BankAccountTable : IntIdTable(name = "bank_accounts")  {
    val uuid: Column<UUID> = uuid(name = "uuid").autoGenerate().uniqueIndex()
    val name: Column<String> = varchar(name = "name", length = 128)
    val type: Column<BankAccountType> = enumerationByName(name = "type", length = 128)
    val amount: Column<Double> = double(name = "amount")
    val creationDate: Column<LocalDate> = date(name = "creation_date").defaultExpression(CurrentDate)
    val lastUpdate: Column<LocalDateTime> = datetime(name = "last_update").defaultExpression(CurrentDateTime)
    val userId: Column<EntityID<Int>> = reference("user_id", UserTable, onDelete = ReferenceOption.CASCADE)
}