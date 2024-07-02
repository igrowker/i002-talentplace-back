const formatHour = (hour: number): string => {
    const hourString = hour.toString();        
    const formattedHour = hourString.slice(0, 2) + ':' + hourString.slice(2); // divido los 4 digitos en 2  al principio y aumento los ":" 
    return formattedHour;
}
export default formatHour;