import axios from "axios";

axios.defaults.withCredentials = true;
export const api = axios.create({
  baseURL: 'https://verzel-app-back.vercel.app',
  withCredentials: true
});
