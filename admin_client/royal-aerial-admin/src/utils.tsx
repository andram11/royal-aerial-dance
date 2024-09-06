export const formatDateToBelgium = (dateString: string | Date): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('nl-BE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
  };

  export function capitalizeFirstLetter(str:string, locale=navigator.language) {
    return str.replace(/^\p{CWU}/u, char => char.toLocaleUpperCase(locale));
  }
  
  

export async function viewDetailsByid(id: string, getDetailsByIdFunction: (id: string)=> Promise<any>){
    try {
        const details= await getDetailsByIdFunction(id);
        console.log(details)
        return details
    } catch(err){
        throw err
    }
}