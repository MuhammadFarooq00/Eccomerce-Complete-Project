/* eslint-disable @typescript-eslint/no-explicit-any */
import { AiOutlineSortAscending, AiOutlineSortDescending } from "react-icons/ai"
import { Column, TableOptions, useTable, useSortBy,usePagination } from "react-table"

function TableHoc<T extends object>(columns: Column<T>[], data:T[],containerclassname: string,heading: string,show_pagination:boolean=false){
    return function TableHoc(){
         const options: TableOptions<T> = {
            columns,
            data,
            initialState:{
                pageSize: 4
            }
         }
         const {getTableProps, getTableBodyProps, headerGroups,page, pageCount,state:{pageIndex},prepareRow, nextPage,previousPage,canNextPage,canPreviousPage} = useTable(options,useSortBy,usePagination)

         return (<>
         <div className={containerclassname}>
            <h2 className="heading">{heading}</h2>
            <table className="table" {...getTableProps}>
                 <thead>
                    {headerGroups.map((header)=>{
                        return (<tr {...header.getHeaderGroupProps()}>

                             {header.headers.map((column: any )=> (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render("Header")}
                                    {column.isSorted && <span>{" "}{column.isSortedDesc? <AiOutlineSortDescending/>: <AiOutlineSortAscending/>}</span>}
                                </th>
                             ))}

                        </tr>)
                    })}
                 </thead>
            <tbody {...getTableBodyProps()}>
 
            {
                page.map((row)=> {
                    prepareRow(row);
                    return <tr {...row.getRowProps()}>
                        {
                            row.cells.map((cell)=>(
                                <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                            ))
                        }
                    </tr>
                })
            }

            </tbody>
            </table>
            {
                show_pagination && <div className="pagination">
                    <button disabled={!canPreviousPage} onClick={previousPage}>Previous</button>
                    <span>{`${pageIndex+1} of ${pageCount}`}</span>
                    <button disabled={!canNextPage} onClick={nextPage}>Next</button>
                </div>
            }
            {/* goto used for moving direct to which page  */}
         </div>
         </>)
    }
}

export default TableHoc
