import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

export default function ForgetPassword() {
  return (
    <section className="p-10">
      <div className="w-full max-w-[1100px] mx-auto py-5 px-4">
        <div className="flex items-center justify-center">
          <div className="rounded-sm max-w-[424px] shadow-[0px_5px_17px_-4px_rgba(0,0,0,0.37)]">
            <div className="p-4">
              <h1 className="text-2xl text-center">Forgot Password</h1>
              <p className="text-center mt-2 max-w-[320px] mx-auto text-dark text-sm">
                Enter the email address or mobile phone number associated with
                your Clicon account.
              </p>
            </div>

            <form className="flex flex-col gap-4 p-4">
              <div>
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-dark mb-1"
                >
                  Email Address
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  className="border p-2 w-full rounded-sm text-sm"
                  required
                  autoComplete="off"
                />
              </div>

              <div>
                <p className="text-sm font-normal text-dark">
                  Already have an account ?{" "}
                  <Link to="/login" className="text-[#2da5f3] hover:underline">
                    Sign in
                  </Link>
                </p>

                <p className="text-sm font-normal text-dark">
                  Dont have an account ?{" "}
                  <Link
                    to="/register"
                    className="text-[#2da5f3] hover:underline"
                  >
                    Sign up
                  </Link>
                </p>
              </div>

              <button
                type="submit"
                className="bg-[#fa8232] text-white uppercase w-full rounded-sm p-2 font-semibold text-sm flex items-center justify-center gap-3 opacity-80 hover:opacity-100 transition-opacity duration-200 ease-linear"
              >
                Send Code
                <FaArrowRight className="mt-[1px]" />
              </button>
            </form>

            <div className="p-4 border-t">
              <p className=" max-w-[330px] text-dark text-sm">
                You may contact{" "}
                <Link to="/" className="text-[#fa8232]">
                  Customer Service
                </Link>{" "}
                for help restoring access to your account.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
