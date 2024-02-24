import axios, { AxiosResponse } from "axios";

const backendURL: string = import.meta.env.VITE_REACT_APP_BACKEND_URL;

export const register = async (
  name: string,
  email: string,
  mobile: string,
  password: string
): Promise<any> => {
  try {
    const requrl: string = `${backendURL}/register`;
    const payLoad = {
      name: name,
      email: email,
      mobile: mobile,
      password: password,
    };
    const response: AxiosResponse<any> = await axios.post(requrl, payLoad);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    }

    return { error: "An error occurred" };
  }
};

export const login = async (email: string, password: string): Promise<any> => {
  try {
    const requrl: string = `${backendURL}/login`;
    const payLoad = {
      email,
      password,
    };
    const response: AxiosResponse<any> = await axios.post(requrl, payLoad);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    }

    return { error: "An error occurred" };
  }
};
