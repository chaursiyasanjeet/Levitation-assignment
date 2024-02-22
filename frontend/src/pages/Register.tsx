import { FC } from "react";

const Register: FC = () => {
  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full border-4">
          <h1 className="mb-8 text-3xl text-center">Create Account</h1>
          <input
            type="text"
            className="block border-2 border-grey-light w-full p-3 rounded mb-4"
            name="fullname"
            placeholder="Full Name"
          />
          <input
            type="text"
            className="block border-2 border-grey-light w-full p-3 rounded mb-4"
            name="email"
            placeholder="Email"
          />

          <input
            type="password"
            className="block border-2 border-grey-light w-full p-3 rounded mb-4"
            name="password"
            placeholder="Password"
          />
          <input
            type="password"
            className="block border-2 border-grey-light w-full p-3 rounded mb-4"
            name="confirm_password"
            placeholder="Confirm Password"
          />

          <button
            type="submit"
            className="block bg-violet-950 text-white text-xl border-2 border-black w-full p-3 rounded mb-4"
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

        <div className="text-grey-dark mt-6">
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
    </div>
  );
};

export default Register;
