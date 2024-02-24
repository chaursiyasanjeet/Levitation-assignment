import axios, { AxiosResponse } from "axios";

const backendURL: string = import.meta.env.VITE_REACT_APP_BACKEND_URL;

interface Product {
  productName: string;
  quantity: string;
  rate: string;
}

export const generateInvoice = async (products: Product[]): Promise<any> => {
  try {
    const requrl: string = `${backendURL}/generateInvoice`;
    const storedToken = localStorage.getItem("invoiceGenrator");
    const config = {
      headers: {
        token: storedToken,
      },
    };
    const payLoad = products;
    const response: AxiosResponse<any> = await axios.post(
      requrl,
      payLoad,
      config
    );
    console.log(response);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    }

    return { error: "An error occurred" };
  }
};

export const getInvoice = async () => {
  try {
    const requrl: string = `${backendURL}/getInvoice`;
    const storedToken = localStorage.getItem("invoiceGenrator");
    console.log(storedToken);
    const config = {
      headers: {
        token: storedToken,
      },
    };
    console.log(config);
    const response: AxiosResponse<any> = await axios.post(requrl, config);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    }

    return { error: "An error occurred" };
  }
};

export const downloadInvoice = async (filename: string) => {
  try {
    const requrl: string = `${backendURL}/downloadInvoice/${filename}`;
    const response: AxiosResponse<any> = await axios.get(requrl);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    }

    return { error: "An error occurred" };
  }
};
