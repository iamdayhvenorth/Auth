import { MoveRight } from "lucide-react";

export default function VerifyEmailPage() {
  return (
    <section className="p-10">
      <div className="w-full max-w-[1100px] mx-auto  px-4 ">
        <div className="flex items-center justify-center">
          <div className="p-4 rounded-sm max-w-[424px] shadow-[0px_5px_17px_-4px_rgba(0,0,0,0.37)]">
            <h1 className="text-center text-3xl font-semibold text-dark mb-4">
              Verify Your Email
            </h1>

            <p className="text-center font-normal text-dark text-sm mb-3">
              Please check your inbox for a verification email. If you haven't
              received it, please check your spam folder. Once you've received
              the email, click on the verification link to complete the email
              verification process.
            </p>

            <form className="mt-3 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-dark text-sm font-normal">
                  Verification Code
                </span>
                <span className="font-medium text-sm text-[#2da5f3] cursor-pointer">
                  Resend code
                </span>
              </div>

              <input
                type="text"
                required
                className="w-full border rounded-sm p-2 text-sm"
              />

              <button className="font-semibold text-sm bg-[#fa8232] text-white uppercase p-2 rounded-sm opacity-85 hover:opacity-100 transition-opacity duration-200 ease-linear flex items-center gap-2 justify-center">
                Verify me
                <MoveRight />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
