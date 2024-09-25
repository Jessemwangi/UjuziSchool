export const timeformat = (parseDate) =>
{
    
const date = new Date(parseDate);
const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
return formattedDate;
}