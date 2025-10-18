import { STUDENT_API_PATH } from "@/utils";
import axiosInstance, { CreateAxiosDefaults } from "axios";

const baseConfig: CreateAxiosDefaults = {
  baseURL: STUDENT_API_PATH,
  withCredentials: true
};

export const instanceWithoutInterceptors = axiosInstance.create(baseConfig);

const axios = axiosInstance.create(baseConfig);

export default axios;
