const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export function getDayOfWeek(date: Date){
    let d= new Date(date)
    return days[d.getDay()];
}

export function dateCompare(beginDate: Date, endDate: Date){
    let startDate= new Date(beginDate)
    let endingDate= new Date(endDate)
    if (startDate <= endingDate){
        return true
    } else {
        return false
    }
}

export function checkTimeslot(timeslot: string){
    let begin= Number(timeslot.slice(0,2))
    let end= Number(timeslot.slice(6,8))
    if (begin < end) {
        return true
    } else {
        return false
    }
}