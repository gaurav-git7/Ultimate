import React from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { Checkbox } from "../../../../components/ui/checkbox";
import { Input } from "../../../../components/ui/input";
import { Textarea } from "../../../../components/ui/textarea";

export const ContactSection = () => {
  return (
    <section className="w-full py-28 px-16 bg-white">
      <div className="max-w-[768px]">
        <div className="flex flex-col items-start gap-4 mb-12">
          <div className="inline-flex items-center">
            <span className="font-heading-desktop-tagline font-[number:var(--heading-desktop-tagline-font-weight)] text-black text-[length:var(--heading-desktop-tagline-font-size)] tracking-[var(--heading-desktop-tagline-letter-spacing)] leading-[var(--heading-desktop-tagline-line-height)] [font-style:var(--heading-desktop-tagline-font-style)]">
              Connect
            </span>
          </div>

          <div className="flex flex-col items-start gap-6 w-full">
            <h2 className="text-[length:var(--heading-desktop-h2-font-size)] leading-[var(--heading-desktop-h2-line-height)] font-heading-desktop-h2 font-[number:var(--heading-desktop-h2-font-weight)] text-black tracking-[var(--heading-desktop-h2-letter-spacing)] [font-style:var(--heading-desktop-h2-font-style)]">
              Get in Touch
            </h2>

            <p className="font-text-medium-normal font-[number:var(--text-medium-normal-font-weight)] text-black text-[length:var(--text-medium-normal-font-size)] tracking-[var(--text-medium-normal-letter-spacing)] leading-[var(--text-medium-normal-line-height)] [font-style:var(--text-medium-normal-font-style)]">
              We&#39;d love to hear from you. Reach out!
            </p>
          </div>
        </div>

        <Card className="border-none shadow-none">
          <CardContent className="p-0 space-y-6">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="name"
                className="font-text-regular-normal font-[number:var(--text-regular-normal-font-weight)] text-black text-[length:var(--text-regular-normal-font-size)] tracking-[var(--text-regular-normal-letter-spacing)] leading-[var(--text-regular-normal-line-height)] [font-style:var(--text-regular-normal-font-style)]"
              >
                Name
              </label>
              <Input
                id="name"
                className="border border-solid border-black rounded-none p-3"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="font-text-regular-normal font-[number:var(--text-regular-normal-font-weight)] text-black text-[length:var(--text-regular-normal-font-size)] tracking-[var(--text-regular-normal-letter-spacing)] leading-[var(--text-regular-normal-line-height)] [font-style:var(--text-regular-normal-font-style)]"
              >
                Email
              </label>
              <Input
                id="email"
                className="border border-solid border-black rounded-none p-3"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="message"
                className="font-text-regular-normal font-[number:var(--text-regular-normal-font-weight)] text-black text-[length:var(--text-regular-normal-font-size)] tracking-[var(--text-regular-normal-letter-spacing)] leading-[var(--text-regular-normal-line-height)] [font-style:var(--text-regular-normal-font-style)]"
              >
                Message
              </label>
              <Textarea
                id="message"
                placeholder="Type your message..."
                className="border border-solid border-black rounded-none p-3 h-[182px] resize-none placeholder:text-[#00000099]"
              />
            </div>

            <div className="flex items-center gap-2 pb-4">
              <Checkbox
                id="terms"
                className="w-5 h-5 rounded-none border-black data-[state=checked]:bg-black data-[state=checked]:text-white"
              />
              <label
                htmlFor="terms"
                className="font-text-small-normal font-[number:var(--text-small-normal-font-weight)] text-black text-[length:var(--text-small-normal-font-size)] tracking-[var(--text-small-normal-letter-spacing)] leading-[var(--text-small-normal-line-height)] [font-style:var(--text-small-normal-font-style)]"
              >
                I accept the Terms
              </label>
            </div>

            <Button className="bg-black text-white rounded-none px-6 py-3 h-auto font-text-regular-normal font-[number:var(--text-regular-normal-font-weight)] text-[length:var(--text-regular-normal-font-size)] tracking-[var(--text-regular-normal-letter-spacing)] leading-[var(--text-regular-normal-line-height)] [font-style:var(--text-regular-normal-font-style)]">
              Submit
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};