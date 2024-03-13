export function extractTime(dateString) {
    const date = new Date(dateString);
    let hours = date.getHours();
    const minutes = padZero(date.getMinutes());
    const amPm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12 || 12; // Convert 0 to 12 for 12-hour clock
    hours = padZero(hours);
    return `${hours}:${minutes} ${amPm}`;
}

function padZero(number) {
    return number.toString().padStart(2, "0");
}