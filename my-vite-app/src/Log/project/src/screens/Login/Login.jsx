import React from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Separator } from "../../components/ui/separator";

export const Login = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="flex flex-col items-center px-16 py-0 w-full max-w-[1440px]">
        <div className="flex flex-col h-[72px] items-start justify-center w-full" />

        <div className="flex flex-col items-center justify-center gap-8 w-full flex-1">
          <div className="flex flex-col items-center gap-6 w-full">
            <h2 className="w-full font-heading-desktop-h2 font-[number:var(--heading-desktop-h2-font-weight)] text-black text-[length:var(--heading-desktop-h2-font-size)] text-center tracking-[var(--heading-desktop-h2-letter-spacing)] leading-[var(--heading-desktop-h2-line-height)] [font-style:var(--heading-desktop-h2-font-style)]">
              Log In
            </h2>

            <p className="w-full font-text-medium-normal font-[number:var(--text-medium-normal-font-weight)] text-black text-[length:var(--text-medium-normal-font-size)] text-center tracking-[var(--text-medium-normal-letter-spacing)] leading-[var(--text-medium-normal-line-height)] [font-style:var(--text-medium-normal-font-style)]">
              Lorem ipsum dolor sit amet adipiscing elit.
            </p>
          </div>

          <div className="flex flex-col items-center gap-6">
            <div className="flex flex-col w-[480px] items-center justify-center gap-4">
              <Input
                className="p-3 border border-solid border-black rounded-none font-text-regular-normal text-[#00000099] placeholder:text-[#00000099]"
                placeholder="Email"
              />

              <Input
                className="p-3 border border-solid border-black rounded-none font-text-regular-normal text-[#00000099] placeholder:text-[#00000099]"
                type="password"
                placeholder="Password"
              />

              <Button className="w-full px-6 py-3 bg-black text-white rounded-none font-text-regular-normal hover:bg-black/90">
                Log in
              </Button>

              <div className="flex flex-col items-start px-0 py-4 w-full">
                <Separator className="w-full h-px" />
              </div>

              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-3 px-6 py-3 border border-solid border-black rounded-none font-text-regular-normal"
              >
                <img
                  className="w-6 h-6"
                  alt="Icon google"
                  src="/icon---google.svg"
                />
                Log in with Google
              </Button>

              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-3 px-6 py-3 border border-solid border-black rounded-none font-text-regular-normal"
              >
                <img
                  className="w-6 h-6"
                  alt="Icon facebook"
                  src="/icon---facebook.svg"
                />
                Log in with Facebook
              </Button>

              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-3 px-6 py-3 border border-solid border-black rounded-none font-text-regular-normal"
              >
                <img
                  className="w-6 h-6"
                  alt="Icon apple"
                  src="/icon---apple.svg"
                />
                Log in with Apple
              </Button>
            </div>

            <div className="flex flex-col items-center gap-4">
              <Button
                variant="link"
                className="p-0 font-text-regular-link text-black underline"
              >
                Forgot your password?
              </Button>

              <div className="flex items-center gap-[5px]">
                <span className="font-text-regular-normal text-black text-center">
                  Don&#39;t have an account?
                </span>
                <Button
                  variant="link"
                  className="p-0 font-text-regular-link text-black underline"
                >
                  Sign Up
                </Button>
              </div>
            </div>
          </div>
        </div>

        <footer className="flex h-[72px] items-center gap-[5px] w-full">
          <span className="font-text-small-normal font-[number:var(--text-small-normal-font-weight)] text-black text-[length:var(--text-small-normal-font-size)] text-center tracking-[var(--text-small-normal-letter-spacing)] leading-[var(--text-small-normal-line-height)] whitespace-nowrap [font-style:var(--text-small-normal-font-style)]">
            {""}
          </span>
        </footer>
      </div>
    </div>
  );
};