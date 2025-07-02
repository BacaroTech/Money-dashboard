package mft.dev.configuration

import io.ktor.server.application.*
import mft.dev.table.BankAccountTable
import mft.dev.table.OperationTable
import mft.dev.table.UserTable
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.transactions.transaction

fun Application.configureDatabases() {
    val dbConfig = environment.config.property("postgres").getMap()

    Database.connect(
        url = dbConfig["url"].toString() ,
        user = dbConfig["user"].toString(),
        driver = dbConfig["driver"].toString(),
        password = dbConfig["password"].toString(),
    )

//    transaction {
//        SchemaUtils.create(UserTable, BankAccountTable, OperationTable)
//    }
}
