import RowComponent from "./row";

interface TableRow {
    id?: string;
    data: (string | number)[]; // Array of cell data (can be string, number, or other types as needed)
  } 

interface TableProps {
    headers: string[];
    data: TableRow[];
    rowIcons?: string[];
    rowActions?: Array<{}>;
}

const Table: React.FC<TableProps> = ({
    headers,
    rowIcons,
    data,
    rowActions= []

})=> {



    return(<>
    <table className="bg-tertiary border border-primary-200 border-opacity-20 shadow-2xl drop-shadow-xl w-full">
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
            {data.map((row)=> (
                <tr key={Math.random()}
                className="hover:bg-gray-100">
                    {row.data.map((cell, cellIndex)=> (
                        <td key={cellIndex}
                        className="lg:py-4 py-4 px-2 text-md text-center border-b border-primary-100">
                            {cell}
                        </td>
                    ))}

                    <RowComponent
                    rowIcons={rowIcons}
                    rowActions={rowActions}
                    itemId={row.id}
                    />
                </tr>
            ))}
           
        </tbody>
    </table>


    </>)
}

export default Table;