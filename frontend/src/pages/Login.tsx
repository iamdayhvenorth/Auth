import { Link, useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import useUserAuthStore from "../store/userAuthStore";
import { useForm } from "react-hook-form";

type LoginForm = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const { register, handleSubmit } = useForm<LoginForm>();

  const isLoading = useUserAuthStore((state) => state.isLoading);
  const login = useUserAuthStore((state) => state.login);
  const error = useUserAuthStore((state) => state.error);
  const navigate = useNavigate();

  const fetchData = async (data: LoginForm) => {
    try {
      const { email, password } = data;
      await login(email, password);

      navigate("/", { replace: true });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="p-10">
      <div className="w-full max-w-[1100px] mx-auto py-5 px-4">
        <div className="flex items-center justify-center">
          <div className=" rounded-sm max-w-[424px] shadow-[0px_5px_17px_-4px_rgba(0,0,0,0.37)]">
            <div>
              <h2 className="form-header">Sign In</h2>
            </div>

            <form
              className="p-6 flex flex-col gap-4"
              onSubmit={handleSubmit(fetchData)}
            >
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
                  {...register("email")}
                  className="border p-2 w-full rounded-sm text-sm"
                  required
                  autoComplete="off"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label
                    htmlFor="password"
                    className="text-sm  text-dark font-medium"
                  >
                    Password
                  </label>
                  <Link
                    to={"/login/forget-password"}
                    className="text-sm font-medium text-[#2da5f3]"
                  >
                    Forgot Password
                  </Link>
                </div>
                <input
                  type="password"
                  id="password"
                  {...register("password")}
                  className="border p-2 w-full rounded-sm text-sm"
                  required
                  autoComplete="off"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="bg-[#fa8232] text-white uppercase w-full rounded-sm p-2 font-semibold text-sm flex items-center justify-center gap-3 opacity-80 hover:opacity-100 transition-opacity duration-200 ease-linear"
              >
                {isLoading ? "Loading..." : "Sign In"}
                <FaArrowRight className="mt-[1px]" />
              </button>

              {error && <p className="text-sm text-red-500">{error}</p>}

              <p className="text-sm font-normal text-dark">
                Dont have an account ?{" "}
                <Link to="/" className="text-[#2da5f3] hover:underline">
                  {" "}
                  Sign up
                </Link>
              </p>

              <div className="relative">
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
                  Login with Google
                </button>
                <button
                  type="button"
                  className="flex items-center gap-3 justify-center border p-2 rounded-sm text-base font-medium"
                >
                  <img src="/images/apple-logo.png" alt="Google Logo" />
                  Login with Apple
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
