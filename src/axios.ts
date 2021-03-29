import axios, { AxiosInstance } from 'axios';
import { createContext } from 'react';

export function configureAxios(apiUrl: string) {
  console.info('using api endpoint', apiUrl);
  const axiosInstance = axios.create({
    baseURL: apiUrl,
    timeout: 30000,
  });
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(new Error(error?.response?.data))
  );
  return axiosInstance;
}

export const AxiosContext = createContext<AxiosInstance>(axios);
