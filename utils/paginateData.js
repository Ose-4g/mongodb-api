

const paginateData = async(query,filter, page,limit,sort={})=>{

    const results = await query.find(filter).sort(sort).skip((page-1)*limit).limit(limit).toArray()

    const totalDocuments = await query.countDocuments(filter)
    const totalPages = Math.ceil(totalDocuments/limit)
    const nextPage = page<totalPages ? page+1 : null
    const prevPage = page>1 ? page - 1 : null

    const response = {
        currentPage:page,
        nextPage,
        prevPage,
        totalDocuments,
        totalPages,
        results
    }

    return response

}

module.exports = paginateData