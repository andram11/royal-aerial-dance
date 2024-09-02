import React from "react";

interface PaginationProps {
    currentPage: number,
    onPageChange: (page: number)=> void;
    totalItems: number
}


const Pagination: React.FC<PaginationProps> = ({currentPage, onPageChange, totalItems})=> {
    //page Size by default 10
    const totalPages= Math.ceil(totalItems/10)
    //Generate array of pages to map over
    const pageNumbers= Array.from({length: totalPages}, (_, i)=> i+1 )

    
    return ( 
        <>
            {/* Pagination (optional) */}
            {totalItems&& onPageChange &&
                <div className="space-x-6 text-lg">
                    <button className="text-secondary" onClick={() => onPageChange} >
                    Previous
                    </button>
        
                    {pageNumbers.map((page, index)=> (
                        page!==1? 
                        <span key={index} className="text-primary">{page}</span>:
                        <span key={index} className="text-tertiary-200 text-xl font-extrabold">{currentPage}</span>
                    ))}
                   
                    <button className="text-secondary" onClick={() => onPageChange}>
                    Next
                    </button>
              </div>}
        </>
        
    )

}

export default Pagination;