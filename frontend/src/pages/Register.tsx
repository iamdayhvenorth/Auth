import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

export default function RegisterPage() {
  return (
    <section className="p-10">
      <div className="w-full max-w-[1100px] mx-auto py-5 px-4">
        <div className="flex items-center justify-center">
          <div className=" rounded-sm max-w-[424px] shadow-[0px_5px_17px_-4px_rgba(0,0,0,0.37)]">
            <div>
              <h2 className="form-header">Sign Up</h2>
            </div>

            <form className="p-6 flex flex-col gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-dark mb-1"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="border p-2 w-full rounded-sm text-sm"
                  required
                  autoComplete="off"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-dark mb-1"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="border p-2 w-full rounded-sm text-sm"
                  required
                  autoComplete="off"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="text-sm  text-dark font-medium"
                >
                  Password
                </label>

                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="8+ characters"
                  className="border p-2 w-full rounded-sm text-sm"
                  required
                  autoComplete="off"
                />
              </div>

              <div>
                <label
                  htmlFor="cpassword"
                  className="text-sm  text-dark font-medium"
                >
                  Confirm Password
                </label>

                <input
                  type="password"
                  id="cpassword"
                  name="cpassword"
                  className="border w-full rounded-sm text-sm p-2"
                  required
                  autoComplete="off"
                />
              </div>

              <div className="flex gap-2 items-start">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  className="mt-[6px] w-5 h-5"
                />
                <p className="max-w-[310px] text-dark text-sm font-normal">
                  Are you sure you agree to Clicon{" "}
                  <span className="text-[#2da5f3] font-medium">
                    Terms of Condition
                  </span>{" "}
                  and{" "}
                  <span className="text-[#2da5f3] font-medium">
                    Privacy Policy.
                  </span>
                </p>
              </div>

              <button
                type="submit"
                className="bg-[#fa8232] text-white uppercase w-full rounded-sm p-2 font-semibold text-sm flex items-center justify-center gap-3 opacity-80 hover:opacity-100 transition-opacity duration-200 ease-linear"
              >
                Sign Up
                <FaArrowRight className="mt-[2px]" />
              </button>

              <p className="text-sm font-normal text-dark">
                Already have an account ?{" "}
                <Link to="/login" className="text-[#2da5f3] hover:underline">
                  {" "}
                  Sign in
                </Link>
              </p>

              <div className="relative my-3">
                <hr />
                <span className="absolute left-1/2 -top-[14px] -translate-x-1/2 bg-white text-base font-normal text-dark">
                  or
                </span>
              </div>

              <div className="w-full flex flex-col gap-2">
                <button
                  type="button"
                  className="flex items-center gap-3 justify-center border p-2 rounded-sm text-base font-medium "
                >
                  <img src="/images/Google-logo.png" alt="Google Logo" />
                  Sign up with Google
                </button>
                <button
                  type="button"
                  className="flex items-center gap-3 justify-center border p-2 rounded-sm text-base font-medium"
                >
                  <img src="/images/apple-logo.png" alt="Google Logo" />
                  Sign up with Apple
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
