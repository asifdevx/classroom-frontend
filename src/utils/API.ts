import { BACKEND_API } from "@/constants/EnvValues";
import axios from "axios";

const API = axios.create({
  baseURL: BACKEND_API,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
