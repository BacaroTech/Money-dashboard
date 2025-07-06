package mft.dev.table

import mft.dev.enums.OperationCategory
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.UUIDTable
import org.jetbrains.exposed.sql.Column
import org.jetbrains.exposed.sql.ReferenceOption
import org.jetbrains.exposed.sql.javatime.CurrentDate
import org.jetbrains.exposed.sql.javatime.CurrentDateTime
import org.jetbrains.exposed.sql.javatime.date
import org.jetbrains.exposed.sql.javatime.datetime
import java.time.LocalDate
import java.time.LocalDateTime

object OperationTable : UUIDTable(name = "operations") {
    val category: Column<OperationCategory> = enumerationByName("category", length = 128)
    val amount: Column<Double> = double("amount")
    val description: Column<String?> = varchar("description", length = 256).nullable()
    val date: Column<LocalDate> = date("date")
    val creationDate: Column<LocalDate> = date(name = "creation_date").defaultExpression(CurrentDate)
    val lastUpdate: Column<LocalDateTime> = datetime(name = "last_update").defaultExpression(CurrentDateTime)

    val bankAccountId: Column<EntityID<Int>> = OperationTable.reference("bank_account_id", BankAccountTable, onDelete = ReferenceOption.CASCADE)
}