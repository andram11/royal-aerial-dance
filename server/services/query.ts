const DEFAULT_PAGE_LIMIT= 50

//If we pass 0 as page limit Mongoose will return everything


function getPagination(pageNumber: number, limitItems:number){
    const page= Math.abs((pageNumber)) || 1
    const limit = Math.abs(limitItems) || DEFAULT_PAGE_LIMIT
    const skip= (page-1)*limit 

    return {
        skip,
        limit
    }
}
 export default getPagination;