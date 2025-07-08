package mft.dev.table

import org.jetbrains.exposed.dao.id.IntIdTable
import org.jetbrains.exposed.sql.Column
import org.jetbrains.exposed.sql.javatime.CurrentDate
import org.jetbrains.exposed.sql.javatime.CurrentDateTime
import org.jetbrains.exposed.sql.javatime.date
import org.jetbrains.exposed.sql.javatime.datetime
import java.time.LocalDate
import java.time.LocalDateTime
import java.util.UUID

object UserTable : IntIdTable(name = "users") {
    val uuid: Column<UUID> = uuid(name = "uuid").autoGenerate().uniqueIndex()
    val firstName: Column<String> = varchar(name = "first_name", length = 128)
    val lastName: Column<String> = varchar(name = "last_name", length = 128)
    val email: Column<String> = varchar(name = "email", length = 128).uniqueIndex()
    val password: Column<String> = varchar(name = "password", length = 256)
    val creationDate: Column<LocalDate> = date(name = "creation_date").defaultExpression(CurrentDate)
    val lastUpdate: Column<LocalDateTime> = datetime(name = "last_update").defaultExpression(CurrentDateTime)
}