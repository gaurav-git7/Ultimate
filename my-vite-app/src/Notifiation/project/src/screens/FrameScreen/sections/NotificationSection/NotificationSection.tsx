import React from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { Input } from "../../../../components/ui/input";

export const NotificationSection = (): JSX.Element => {
  // Data for quick links column
  const quickLinks = [
    "About Us",
    "Contact Us",
    "Support Center",
    "Blog Posts",
    "FAQs",
  ];

  // Data for resources column
  const resources = [
    "Case Studies",
    "White Papers",
    "Webinars",
    "User Guides",
    "Community Forum",
  ];

  // Data for stay connected column
  const stayConnected = [
    "Social Media",
    "Newsletter",
    "Feedback",
    "Careers",
    "Events",
  ];

  return (
    <footer className="w-full flex flex-wrap gap-8 p-12 bg-white border border-solid border-black">
      <div className="flex flex-1 flex-wrap gap-10">
        {/* Company Logo */}
        <div className="flex flex-col items-start flex-1">
          <img
            className="w-[84px] h-9"
            alt="Company logo"
            src="/company-logo.svg"
          />
        </div>

        {/* Quick Links Column */}
        <div className="flex flex-col items-start gap-4 flex-1">
          <h3 className="font-text-regular-semi-bold font-[number:var(--text-regular-semi-bold-font-weight)] text-black text-[length:var(--text-regular-semi-bold-font-size)] tracking-[var(--text-regular-semi-bold-letter-spacing)] leading-[var(--text-regular-semi-bold-line-height)] [font-style:var(--text-regular-semi-bold-font-style)]">
            Quick Links
          </h3>
          <nav className="w-full">
            <ul className="flex flex-col items-start w-full">
              {quickLinks.map((link, index) => (
                <li key={index} className="py-2 w-full">
                  <a
                    href="#"
                    className="font-text-small-normal font-[number:var(--text-small-normal-font-weight)] text-black text-[length:var(--text-small-normal-font-size)] tracking-[var(--text-small-normal-letter-spacing)] leading-[var(--text-small-normal-line-height)] [font-style:var(--text-small-normal-font-style)]"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Resources Column */}
        <div className="flex flex-col items-start gap-4 flex-1">
          <h3 className="font-text-regular-semi-bold font-[number:var(--text-regular-semi-bold-font-weight)] text-black text-[length:var(--text-regular-semi-bold-font-size)] tracking-[var(--text-regular-semi-bold-letter-spacing)] leading-[var(--text-regular-semi-bold-line-height)] [font-style:var(--text-regular-semi-bold-font-style)]">
            Resources
          </h3>
          <nav className="w-full">
            <ul className="flex flex-col items-start w-full">
              {resources.map((resource, index) => (
                <li key={index} className="py-2 w-full">
                  <a
                    href="#"
                    className="font-text-small-normal font-[number:var(--text-small-normal-font-weight)] text-black text-[length:var(--text-small-normal-font-size)] tracking-[var(--text-small-normal-letter-spacing)] leading-[var(--text-small-normal-line-height)] [font-style:var(--text-small-normal-font-style)]"
                  >
                    {resource}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Stay Connected Column */}
        <div className="flex flex-col items-start gap-4 flex-1">
          <h3 className="font-text-regular-semi-bold font-[number:var(--text-regular-semi-bold-font-weight)] text-black text-[length:var(--text-regular-semi-bold-font-size)] tracking-[var(--text-regular-semi-bold-letter-spacing)] leading-[var(--text-regular-semi-bold-line-height)] [font-style:var(--text-regular-semi-bold-font-style)]">
            Stay Connected
          </h3>
          <nav className="w-full">
            <ul className="flex flex-col items-start w-full">
              {stayConnected.map((item, index) => (
                <li key={index} className="py-2 w-full">
                  <a
                    href="#"
                    className="font-text-small-normal font-[number:var(--text-small-normal-font-weight)] text-black text-[length:var(--text-small-normal-font-size)] tracking-[var(--text-small-normal-letter-spacing)] leading-[var(--text-small-normal-line-height)] [font-style:var(--text-small-normal-font-style)]"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Subscribe Section */}
      <Card className="w-[400px] border-none shadow-none p-0">
        <CardContent className="flex flex-col items-start gap-6 p-0">
          <div className="flex flex-col items-start gap-4 w-full">
            <h3 className="font-text-regular-semi-bold font-[number:var(--text-regular-semi-bold-font-weight)] text-black text-[length:var(--text-regular-semi-bold-font-size)] tracking-[var(--text-regular-semi-bold-letter-spacing)] leading-[var(--text-regular-semi-bold-line-height)] [font-style:var(--text-regular-semi-bold-font-style)]">
              Subscribe
            </h3>
            <p className="font-text-regular-normal font-[number:var(--text-regular-normal-font-weight)] text-black text-[length:var(--text-regular-normal-font-size)] tracking-[var(--text-regular-normal-letter-spacing)] leading-[var(--text-regular-normal-line-height)] [font-style:var(--text-regular-normal-font-style)]">
              Join our newsletter to stay updated on features and releases.
            </p>
          </div>

          <div className="flex flex-col items-start gap-3 w-full">
            <div className="flex items-start gap-4 w-full">
              <Input
                placeholder="Your Email"
                className="flex-1 p-3 border border-solid border-black rounded-none font-text-regular-normal font-[number:var(--text-regular-normal-font-weight)] text-[#00000099] text-[length:var(--text-regular-normal-font-size)] tracking-[var(--text-regular-normal-letter-spacing)] leading-[var(--text-regular-normal-line-height)] [font-style:var(--text-regular-normal-font-style)]"
              />
              <Button className="px-6 py-3 bg-[#61e923] text-black border border-solid border-black rounded-none font-text-regular-normal font-[number:var(--text-regular-normal-font-weight)] text-[length:var(--text-regular-normal-font-size)] tracking-[var(--text-regular-normal-letter-spacing)] leading-[var(--text-regular-normal-line-height)] [font-style:var(--text-regular-normal-font-style)]">
                Subscribe
              </Button>
            </div>
            <p className="font-text-tiny-normal font-[number:var(--text-tiny-normal-font-weight)] text-black text-[length:var(--text-tiny-normal-font-size)] tracking-[var(--text-tiny-normal-letter-spacing)] leading-[var(--text-tiny-normal-line-height)] [font-style:var(--text-tiny-normal-font-style)]">
              By subscribing, you agree to our Privacy Policy and consent to
              receive updates.
            </p>
          </div>
        </CardContent>
      </Card>
    </footer>
  );
};
