const DEFAULT_PAGE_LIMIT= 10

//If we pass 0 as page limit Mongoose will return everything

interface Query {
    page: number,
    limit: number
}
function getPagination(query: Query){
    const page= Math.abs(query.page) || 1
    const limit = Math.abs(query.limit) || DEFAULT_PAGE_LIMIT
    const skip= (page-1)*limit 

    return {
        skip,
        limit
    }
}
 export default getPagination;