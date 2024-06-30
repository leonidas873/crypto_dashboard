import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

export const fetcher = (url: string) =>
    axiosInstance.get(url).then((res) => res.data);
