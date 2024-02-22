import { FC, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { register } from "../apis/auth";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

interface User {
  name: string;
  mobile: string;
  email: string;
  password: string;
}

const Register: FC = () => {
  const redirect = useNavigate();
  const [user, setUser] = useState<User>({
    name: "",
    mobile: "",
    email: "",
    password: "",
  });

  const validateForm = (
    name: string,
    mobile: string,
    email: string,
    password: string
  ): boolean => {
    let error = false;

    if (!/^[a-zA-Z]+(?: [a-zA-Z]+)*$/.test(name) || name === "") {
      toast.error("Invalid Name");
      error = true;
    }
    if (!/^(?!0)[0-9]{10}$/.test(mobile) || mobile === "") {
      toast.error("Enter Valid mobile number");
      error = true;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Enter valid email");
      error = true;
    }
    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        password
      )
    ) {
      toast.error(
        "Password should contain at least one uppercase, one lowercase, one number, and one special character"
      );
      error = true;
    }

    return !error;
  };

  const handleSumbit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const validate = validateForm(
      user.name,
      user.mobile,
      user.email,
      user.password
    );
    if (validate) {
      const result = await register(
        user.name,
        user.email,
        user.mobile,
        user.password
      );
      if (result.status === "SUCCESS") {
        toast.success("Registered Successfully");
        setTimeout(() => {
          redirect("/login");
        }, 2000);
      } else {
        console.log(result);
        toast.error(result.message);
      }
    }
  };

  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <img
        src={logo}
        alt="logo_website"
        className="w-40 self-center mb-2 mt-2"
      />

      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full border-4">
          <h1 className="mb-4 text-3xl text-center">Create Account</h1>
          <input
            type="text"
            className="block border-2 border-grey-light w-full p-3 rounded mb-2"
            name="fullname"
            placeholder="Full Name"
            value={user.name}
            onChange={(e) => {
              setUser({ ...user, name: e.target.value });
            }}
          />
          <input
            type="text"
            className="block border-2 border-grey-light w-full p-3 rounded mb-2"
            name="email"
            placeholder="Email"
            value={user.email}
            onChange={(e) => {
              setUser({ ...user, email: e.target.value });
            }}
          />
          <input
            type="text"
            className="block border-2 border-grey-light w-full p-3 rounded mb-2"
            name="mobile"
            maxLength={10}
            placeholder="Mobile No"
            value={user.mobile}
            onChange={(e) => {
              setUser({ ...user, mobile: e.target.value });
            }}
          />

          <input
            type="password"
            className="block border-2 border-grey-light w-full p-3 rounded mb-4"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={(e) => {
              setUser({ ...user, password: e.target.value });
            }}
          />

          <button
            type="submit"
            className="block bg-violet-950 text-white text-xl border-2 border-black w-full p-3 rounded mb-1"
            onClick={handleSumbit}
          >
            Create Account
          </button>

          <div className="text-center text-sm text-grey-dark mt-4">
            By signing up, you agree to the
            <a
              className="no-underline border-b border-grey-dark text-grey-dark"
              href="#"
            >
              Terms of Service
            </a>{" "}
            and
            <a
              className="no-underline border-b border-grey-dark text-grey-dark"
              href="#"
            >
              Privacy Policy
            </a>
          </div>
        </div>

        <div className="text-grey-dark mt-1">
          Already have an account?{" "}
          <a
            className="no-underline text-blue-600 border-b border-blue"
            href="../../login/"
          >
            Log in
          </a>
          .
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default Register;
