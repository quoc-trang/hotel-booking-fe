import axios from 'axios';

const BASE_DOMAIN = 'https://localhost:8000/api/';
const baseURL = BASE_DOMAIN;

export const axiosInstance = axios.create({
  baseURL,
});