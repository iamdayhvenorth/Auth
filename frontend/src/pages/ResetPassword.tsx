import { FaArrowRight } from "react-icons/fa";

export default function ResetPassword() {
  return (
    <section className="p-10">
      <div className="w-full max-w-[1100px] mx-auto py-5 px-4">
        <div className="flex items-center justify-center">
          <div className="rounded-sm max-w-[424px] shadow-[0px_5px_17px_-4px_rgba(0,0,0,0.37)]">
            <div className="p-4 border-b">
              <h1 className="text-2xl text-center">Forgot Password</h1>
              <p className="text-center mt-2 max-w-[320px] mx-auto text-dark text-sm">
                Please enter your new password
              </p>
            </div>

            <form className="flex flex-col gap-4 p-6 ">
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
                  className="border p-2 w-full rounded-sm text-sm"
                  required
                  autoComplete="off"
                />
              </div>

              <button
                type="submit"
                className="bg-[#fa8232] text-white uppercase w-full rounded-sm p-2 font-semibold text-sm flex items-center justify-center gap-3 opacity-80 hover:opacity-100 transition-opacity duration-200 ease-linear"
              >
                Reset Password
                <FaArrowRight className="mt-[1px]" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
