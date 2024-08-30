import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

interface TableProps {
    headers: string[];
    data: (string|number)[][];/*2 dimensional <array></array>*/
    rowIcons?: string[];
    totalItems?: number;
    currentPage?: number;
    onPageChange?: (page: number)=> void;

}


const Table: React.FC<TableProps> = ({
    headers,
    rowIcons,
    data,
    currentPage,
    onPageChange,
    totalItems

})=> {

    //Pair icons to type of icons
    const renderIcon= (action: string)=> {
        switch(action){
            case 'view':
                return <FaEye className="cursor-pointer text-secondary-200"/>
            case 'edit':
                return <FaEdit className="cursor-pointer text-secondary-200"/>
            case 'delete':
                return <FaTrash className="cursor-pointer text-secondary-200"/>
            default:
                null
        }
    }

    return(<>
    <table className="bg-tertiary border border-primary-200 border-opacity-20 shadow-2xl drop-shadow-xl">
        <thead>
            <tr>
                {headers.map((header, index)=> (
                    <th key={index}
                    className="lg:py-4 py-2 xl:px-10 px-4 border-b border-2 border-primary-200 bg-primary text-lg text-white">
                        {header}
                    </th>
                ))}
            </tr>
        </thead>
        <tbody>
            {data.map((row, rowIndex)=> (
                <tr key={rowIndex}
                className="hover:bg-gray-100">
                    {row.map((cell, cellIndex)=> (
                        <td key={cellIndex}
                        className="lg:py-4 py-4 px-2 text-md text-center border-b border-primary-100">
                            {cell}
                        </td>
                    ))}

                    {rowIcons && (
                        <td className=" text-md text-center border-b border-primary-100">
                            <div className="flex justify-center space-x-3">
                                {rowIcons?.map((action, actionIndex)=>(
                                    <span key={actionIndex}>
                                        {renderIcon(action)}
                                    </span>
                                ))}
                            </div>
                        </td>
                    )}
                </tr>
            ))}
           
        </tbody>
    </table>
    {/* Pagination (optional) */}
            {totalItems&& onPageChange &&
            <div>
                <button onClick={()=> onPageChange(1)}>
                    Previous
                </button>
                <span>{currentPage}</span>
                <button onClick={()=> onPageChange(1)}>
                    Next
                </button>
                </div>}

    </>)
}

export default Table;