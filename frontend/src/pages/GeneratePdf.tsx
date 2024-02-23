import { FC, useContext, useEffect } from "react";
import logo from "../assets/logo.png";
import { ToastContainer, toast } from "react-toastify";
import ProductContext from "../components/context/productContext";
import { useNavigate } from "react-router-dom";

interface Product {
  productName: string;
  rate: string;
  quantity: string;
}

const GeneratePdf: FC = () => {
  const { products } = useContext(ProductContext);

  const redirect = useNavigate();

  // useEffect(() => {
  //   if (products.length === 0) {
  //     redirect("/addproduct");
  //   }
  // }, []);

  return (
    <section className="py-3 h-screen w-screen flex flex-col items-center">
      <div className="w-full  mb-12  px-4 mx-auto mt-1">
        <div className="w-full flex justify-between">
          <h3 className="font-bold text-2xl text-blueGray-700">
            Invoice Genrator
          </h3>
          <img src={logo} alt="logo_website" className="w-40" />
        </div>

        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 rounded h-max">
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center">
              <div className="relative w-screen px-4 max-w-screen flex-grow flex-1"></div>
              <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right"></div>
            </div>
          </div>

          <div className="block w-full overflow-x-auto">
            <table className="items-center bg-transparent w-full border-collapse border-b-2 border-gray-300">
              <thead>
                <tr>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-gray-300 py-3 text-s  border-l-0 border-r-0 whitespace-nowrap  font-bold text-left">
                    Product
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-s  border-l-0 border-r-0 whitespace-nowrap font-bold text-left">
                    Quantity
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-s  border-l-0 border-r-0 whitespace-nowrap font-bold text-left">
                    Rate
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-s border-l-0 border-r-0 whitespace-nowrap font-bold text-left">
                    Total
                  </th>
                </tr>
              </thead>

              <tbody>
                {products.length > 0 ? (
                  products.map((item: Product, index: number) => (
                    <tr key={index}>
                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left  text-blueGray-700 ">
                        {item.productName}
                      </th>
                      <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap font-semibold p-4 text-blue-500 ">
                        {item.quantity}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 font-semibold text-xs whitespace-nowrap p-4 ">
                        {item.rate}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs font-semibold whitespace-nowrap p-4">
                        INR {(item.rate * item.quantity).toFixed(2)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center text-xl font-bold">
                      No Product
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <table className="w-3/6  mt-5 absolute right-0 md:w-2/6">
              <tbody>
                <tr className="mb-5">
                  <td className="font-bold">Total</td>
                  <td className="text-right">
                    INR{" "}
                    {products
                      .reduce((acc, item) => {
                        return (
                          parseFloat(item.rate) * parseFloat(item.quantity) +
                          acc
                        );
                      }, 0)
                      .toFixed(2)}
                  </td>
                </tr>
                <tr className="mb-5">
                  <td>GST</td>
                  <td className="text-right">18%</td>
                </tr>
                <tr className="border-t-2 border-b-2 border-grey-500 ">
                  <td className="font-bold">Grand Total</td>
                  <td className="text-right">
                    INR{" "}
                    {(
                      products.reduce((acc, item) => {
                        return (
                          parseFloat(item.rate) * parseFloat(item.quantity) +
                          acc
                        );
                      }, 0) +
                      products.reduce((acc, item) => {
                        return (
                          parseFloat(item.rate) *
                            parseFloat(item.quantity) *
                            0.18 +
                          acc
                        );
                      }, 0)
                    ).toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <button className="bg-blue-700 text-white text-xl mt-12 font-bold px-2 text-center w-2/4 md:w-1/4 h-10 rounded-xl md:mt-20 md:text-2xl">
        Generate Pdf
      </button>
      <button className="bg-blue-700 text-white text-xl mt-5 font-bold px-2 text-center w-2/4 md:w-1/4 h-10 rounded-xl md:text-2xl ">
        Download Pdf
      </button>

      <h1 className="absolute left-10 bottom-[25vh] font-semibold text-xs">
        Valid until: {new Date().toLocaleDateString()}
      </h1>
      <div className="bg-black w-[95vw] h-[15vh] md:h-[14vh] text-white flex flex-col justify-center rounded-[50px] px-10 py-2 absolute bottom-2">
        <span className="text-xs">Term and Conditions</span>
        <p className="text-xs ">
          we are happy to supply any further information you may need and trust
          that you can call us to fill your order. which will receive our prompt
          and careful attention
        </p>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </section>
  );
};

export default GeneratePdf;
