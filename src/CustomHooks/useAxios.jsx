// src/hooks/useAxiosSecure.js
import axios from "axios";
import { useEffect, useMemo } from "react";
import useAuth from "./useAuth";

const useAxiosSecure = () => {
  const { user } = useAuth();

  const axiosSecure = useMemo(() => {
    return axios.create({
      baseURL: "http://localhost:5000/", 
    });
  }, []);


  useEffect(() => {
    if (!user?.accessToken) return;

    const interceptor = axiosSecure.interceptors.request.use(
      (config) => {
        config.headers.Authorization = `Bearer ${user.accessToken}`;
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => {
      axiosSecure.interceptors.request.eject(interceptor);
    };
  }, [user, axiosSecure]);

  return axiosSecure;
};

export default useAxiosSecure;
