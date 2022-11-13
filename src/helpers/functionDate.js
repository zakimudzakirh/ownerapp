export const formatAge = (date) => {
    let bornDate = new Date(date);
    let currentDate = new Date();

    let year = currentDate.getFullYear() - bornDate.getFullYear();
    let month = currentDate.getMonth() - bornDate.getMonth();
    let result = '';

    if(year === 1) {
        result = `${year} year `;
    }
    
    if(year > 1) {
        result = `${year} years `;
    }

    if(month <= 1) {
        result += `${month} month`
    }

    if(month > 1) {
        result += `${month} months`
    }

    if(result === '') {
        result = '0 month';
    }

    return result;

    // return `${year} ${year > 1? "years" : "year"} and ${month} ${month > 1? "months" : "month"}`;
}