import axios from "axios";
//import { API_BASE_URL } from './ApiConstant';

export const API = axios.create({
  baseURL: "https://hotet-app-api-2-0.onrender.com",
  withCredentials: true,
});
API.interceptors.request.use((req) => {
  if (localStorage.getItem("user")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("user")).token
    }`;
  }
  return req;
});
