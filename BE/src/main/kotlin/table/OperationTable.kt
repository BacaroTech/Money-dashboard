package mft.dev.table

import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.UUIDTable
import org.jetbrains.exposed.sql.Column
import org.jetbrains.exposed.sql.ReferenceOption
import org.jetbrains.exposed.sql.javatime.date
import java.time.LocalDate

object OperationTable : UUIDTable(name = "operations") {
    val category: Column<String> = varchar("category", length = 128) //todo enum incoming or outcoming
    val amount: Column<Int> = integer("amount")
    val description: Column<String?> = varchar("description", length = 256).nullable()
    val date: Column<LocalDate> = date("date")

    val bankAccountId: Column<EntityID<Int>> = BankAccountTable.reference("bank_account_id", BankAccountTable, onDelete = ReferenceOption.CASCADE)
}