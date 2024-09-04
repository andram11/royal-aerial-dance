export const formatDateToBelgium = (dateString: string | Date): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('nl-BE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
  };
  

  