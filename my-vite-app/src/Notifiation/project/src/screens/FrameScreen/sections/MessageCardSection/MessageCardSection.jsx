import React from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { Input } from "../../../../components/ui/input";

export const MessageCardSection = () => {
  // Data for the footer links
  const quickLinks = [
    "About Us",
    "Contact Us",
    "Support Center",
    "Blog Posts",
    "FAQs",
  ];

  const resources = [
    "Case Studies",
    "White Papers",
    "Webinars",
    "User Guides",
    "Community Forum",
  ];

  const stayConnected = [
    "Social Media",
    "Newsletter",
    "Feedback",
    "Careers",
    "Events",
  ];

  return (
    <Card className="flex w-full items-start gap-32 p-12 border border-solid border-black">
      <CardContent className="flex items-start gap-10 relative flex-1 grow p-0">
        <div className="flex flex-col items-start gap-4 relative flex-1 grow">
          <h3 className="self-stretch font-text-regular-semi-bold font-[number:var(--text-regular-semi-bold-font-weight)] text-black text-[length:var(--text-regular-semi-bold-font-size)] tracking-[var(--text-regular-semi-bold-letter-spacing)] leading-[var(--text-regular-semi-bold-line-height)] [font-style:var(--text-regular-semi-bold-font-style)]">
            Quick Links
          </h3>

          <nav className="flex flex-col items-start relative self-stretch w-full">
            {quickLinks.map((link, index) => (
              <a
                key={index}
                href="#"
                className="flex items-start px-0 py-2 relative self-stretch w-full"
              >
                <span className="relative flex-1 font-text-small-normal font-[number:var(--text-small-normal-font-weight)] text-black text-[length:var(--text-small-normal-font-size)] tracking-[var(--text-small-normal-letter-spacing)] leading-[var(--text-small-normal-line-height)] [font-style:var(--text-small-normal-font-style)]">
                  {link}
                </span>
              </a>
            ))}
          </nav>
        </div>

        <div className="flex flex-col items-start gap-4 relative flex-1 grow">
          <h3 className="self-stretch font-text-regular-semi-bold font-[number:var(--text-regular-semi-bold-font-weight)] text-black text-[length:var(--text-regular-semi-bold-font-size)] tracking-[var(--text-regular-semi-bold-letter-spacing)] leading-[var(--text-regular-semi-bold-line-height)] [font-style:var(--text-regular-semi-bold-font-style)]">
            Resources
          </h3>

          <nav className="flex flex-col items-start relative self-stretch w-full">
            {resources.map((resource, index) => (
              <a
                key={index}
                href="#"
                className="flex items-start px-0 py-2 relative self-stretch w-full"
              >
                <span className="relative flex-1 font-text-small-normal font-[number:var(--text-small-normal-font-weight)] text-black text-[length:var(--text-small-normal-font-size)] tracking-[var(--text-small-normal-letter-spacing)] leading-[var(--text-small-normal-line-height)] [font-style:var(--text-small-normal-font-style)]">
                  {resource}
                </span>
              </a>
            ))}
          </nav>
        </div>

        <div className="flex flex-col items-start gap-4 relative flex-1 grow">
          <h3 className="self-stretch font-text-regular-semi-bold font-[number:var(--text-regular-semi-bold-font-weight)] text-black text-[length:var(--text-regular-semi-bold-font-size)] tracking-[var(--text-regular-semi-bold-letter-spacing)] leading-[var(--text-regular-semi-bold-line-height)] [font-style:var(--text-regular-semi-bold-font-style)]">
            Stay Connected
          </h3>

          <nav className="flex flex-col items-start relative self-stretch w-full">
            {stayConnected.map((item, index) => (
              <a
                key={index}
                href="#"
                className="flex items-start px-0 py-2 relative self-stretch w-full"
              >
                <span className="relative flex-1 font-text-small-normal font-[number:var(--text-small-normal-font-weight)] text-black text-[length:var(--text-small-normal-font-size)] tracking-[var(--text-small-normal-letter-spacing)] leading-[var(--text-small-normal-line-height)] [font-style:var(--text-small-normal-font-style)]">
                  {item}
                </span>
              </a>
            ))}
          </nav>
        </div>
      </CardContent>

      <div className="flex flex-col w-[400px] items-start gap-6 relative">
        <div className="flex flex-col items-start gap-4 relative self-stretch w-full">
          <h3 className="self-stretch font-text-regular-semi-bold font-[number:var(--text-regular-semi-bold-font-weight)] text-black text-[length:var(--text-regular-semi-bold-font-size)] tracking-[var(--text-regular-semi-bold-letter-spacing)] leading-[var(--text-regular-semi-bold-line-height)] [font-style:var(--text-regular-semi-bold-font-style)]">
            Subscribe
          </h3>

          <p className="self-stretch font-text-regular-normal font-[number:var(--text-regular-normal-font-weight)] text-black text-[length:var(--text-regular-normal-font-size)] tracking-[var(--text-regular-normal-letter-spacing)] leading-[var(--text-regular-normal-line-height)] [font-style:var(--text-regular-normal-font-style)]">
            Join our newsletter to stay updated on features and releases.
          </p>
        </div>

        <div className="flex flex-col items-start gap-3 relative self-stretch w-full">
          <div className="flex items-start gap-4 relative self-stretch w-full">
            <div className="flex items-center gap-2 p-3 relative flex-1 grow border border-solid border-black">
              <Input
                className="border-none p-0 shadow-none font-text-regular-normal font-[number:var(--text-regular-normal-font-weight)] text-[length:var(--text-regular-normal-font-size)] tracking-[var(--text-regular-normal-letter-spacing)] leading-[var(--text-regular-normal-line-height)] [font-style:var(--text-regular-normal-font-style)]"
                placeholder="Your Email"
              />
            </div>

            <Button className="px-6 py-3 bg-[#61e923] border border-solid border-black rounded-none hover:bg-[#50d818] transition-colors">
              <span className="font-text-regular-normal font-[number:var(--text-regular-normal-font-weight)] text-black text-[length:var(--text-regular-normal-font-size)] tracking-[var(--text-regular-normal-letter-spacing)] leading-[var(--text-regular-normal-line-height)] whitespace-nowrap [font-style:var(--text-regular-normal-font-style)]">
                Subscribe
              </span>
            </Button>
          </div>

          <p className="self-stretch font-text-tiny-normal font-[number:var(--text-tiny-normal-font-weight)] text-black text-[length:var(--text-tiny-normal-font-size)] tracking-[var(--text-tiny-normal-letter-spacing)] leading-[var(--text-tiny-normal-line-height)] [font-style:var(--text-tiny-normal-font-style)]">
            By subscribing, you agree to our Privacy Policy and consent to
            receive updates.
          </p>
        </div>
      </div>
    </Card>
  );
};