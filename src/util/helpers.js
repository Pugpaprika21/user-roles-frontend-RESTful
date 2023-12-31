export function convertToBuddhistEra(dateString) {
    const date = new Date(dateString);
    const buddhistYear = date.getFullYear() + 543;
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${day}/${month}/${buddhistYear}`;
}