import axios from "axios";

export async function doGetUserData(userId) {
    const data = await axios.get(`${import.meta.env.VITE_API_BASE_URL}user/show/${userId}`);
    return data.data.Data.User;
}

export function convertToBuddhistEra(dateString) {
    const date = new Date(dateString);
    const buddhistYear = date.getFullYear() + 543;
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${day}/${month}/${buddhistYear}`;
}