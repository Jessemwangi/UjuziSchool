import axios from "axios";
import { server } from "./Function";

export const httpClient = (token) => {
    const instance = axios.create({
      baseURL: server,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      }
    });
  
    instance.interceptors.request.use(
      (config) => {
        if (token && !config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  
    instance.interceptors.response.use(
      (res) => res,
      (error) => {
        if (
          error?.response?.status === 401 ||
          error?.response?.data?.message?.toLowerCase() === "jwt malformed"
        ) {
          // throw error
        }
        return Promise.reject(error);
      }
    );
  
    return instance;
  };
  