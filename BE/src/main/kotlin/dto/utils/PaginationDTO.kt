package mft.dev.dto.utils

import kotlinx.serialization.Required
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
data class PaginationDTO<T>(
    @SerialName("items")
    @Required
    val items: List<T>,
    @SerialName("total_count")
    @Required
    val totalCount: Long,
    @SerialName("page_number")
    @Required
    val pageNumber: Int,
    @SerialName("page_size")
    @Required
    val pageSize: Int,
    @SerialName("total_pages")
    @Required
    val totalPages: Int
)
