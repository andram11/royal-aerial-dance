const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export function getDayOfWeek(date: Date){
    let d= new Date(date)
    return days[d.getDay()];
}

