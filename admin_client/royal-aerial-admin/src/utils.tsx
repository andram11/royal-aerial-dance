import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

export const formatDateToBelgium = (dateString: string | Date): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('nl-BE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
  };

export function formatDateTimestamp(timestamp: Date) {
    const date = new Date(timestamp);
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  } 

  export function capitalizeFirstLetter(str:string, locale=navigator.language) {
    return str.replace(/^\p{CWU}/u, char => char.toLocaleUpperCase(locale));
  }
  
 export const convertToDateInputFormat = (dateString: string): string => {
    const [day, month, year] = dateString?.split('/');
    return `${year}-${month}-${day}`;
  };

 export function convertToUTC(date: string) {

    // Split the string by '/' to get the day, month, and year
    const [day, month, year] = date.split('/').map(Number);

    // Create a Date object in UTC (note: months in Date.UTC are 0-indexed)
    const utcDate = new Date(Date.UTC(year, month - 1, day));

    // Return the UTC date with time set to 00:00:00
    return utcDate;
}
  

export async function viewDetailsByid(id: string, getDetailsByIdFunction: (id: string)=> Promise<any>){
    try {
        const details= await getDetailsByIdFunction(id);
     
        return details
    } catch(err){
        throw err
    }
}

export function exportToExcel(data: any, filename: string){
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
  saveAs(blob, `${filename}.xlsx`);
}