import { axiosInstance } from './axiosInstance';

const useLocalToken = () => {
  axiosInstance.interceptors.request.use((config) => {
    const token = window.sessionStorage.getItem('token')
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
  });
};

export default useLocalToken;
