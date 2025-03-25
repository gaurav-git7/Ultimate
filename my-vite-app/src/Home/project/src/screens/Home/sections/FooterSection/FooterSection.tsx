import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
  YoutubeIcon,
} from "lucide-react";
import React from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { Input } from "../../../../components/ui/input";

export const FooterSection = (): JSX.Element => {
  // Footer link data for mapping
  const footerLinks = {
    quickLinks: {
      title: "Quick Links",
      links: ["About Us", "Contact Us", "Support Center", "Blog Posts", "FAQs"],
    },
    resources: {
      title: "Resources",
      links: [
        "Case Studies",
        "White Papers",
        "Webinars",
        "User Guides",
        "Community Forum",
      ],
    },
    stayConnected: {
      title: "Stay Connected",
      links: ["Social Media", "Newsletter", "Feedback", "Careers", "Events"],
    },
  };

  // Social media icons
  const socialIcons = [
    { icon: <FacebookIcon className="w-6 h-6" />, alt: "Facebook" },
    { icon: <InstagramIcon className="w-6 h-6" />, alt: "Instagram" },
    { icon: <TwitterIcon className="w-6 h-6" />, alt: "X" },
    { icon: <LinkedinIcon className="w-6 h-6" />, alt: "LinkedIn" },
    { icon: <YoutubeIcon className="w-6 h-6" />, alt: "YouTube" },
  ];

  // Legal links
  const legalLinks = ["Privacy Policy", "Terms of Service", "Cookie Settings"];

  return (
    <footer className="w-full items-center gap-8 px-16 py-20 bg-white flex flex-col">
      <Card className="w-full border border-black rounded-none">
        <CardContent className="flex flex-col md:flex-row p-12 gap-8 md:gap-32">
          <div className="flex flex-1 items-start gap-10">
            <div className="flex-1 h-9" />

            {/* Map through the footer link categories */}
            {Object.values(footerLinks).map((category, index) => (
              <div
                key={index}
                className="flex flex-col items-start gap-4 flex-1"
              >
                <h3 className="self-stretch font-text-regular-semi-bold text-black">
                  {category.title}
                </h3>
                <nav className="items-start self-stretch w-full flex flex-col">
                  {category.links.map((link, linkIndex) => (
                    <a
                      key={linkIndex}
                      href="#"
                      className="flex items-start px-0 py-2 self-stretch w-full"
                    >
                      <span className="flex-1 font-text-small-normal text-black">
                        {link}
                      </span>
                    </a>
                  ))}
                </nav>
              </div>
            ))}
          </div>

          {/* Subscribe section */}
          <div className="flex flex-col w-full md:w-[400px] items-start gap-6">
            <div className="flex flex-col items-start gap-4 self-stretch w-full">
              <h3 className="self-stretch font-text-regular-semi-bold text-black">
                Subscribe
              </h3>
              <p className="self-stretch font-text-regular-normal text-black">
                Join our newsletter to stay updated on features and releases.
              </p>
            </div>

            <div className="flex flex-col gap-3 self-stretch w-full items-start">
              <div className="flex gap-4 self-stretch w-full items-start">
                <div className="flex-1 border border-black">
                  <Input
                    className="border-0 font-text-regular-normal text-[#00000099]"
                    placeholder="Your Email"
                  />
                </div>
                <Button className="px-6 py-3 bg-[#61e923] text-black border border-black rounded-none font-text-regular-normal">
                  Subscribe
                </Button>
              </div>
              <p className="self-stretch font-text-tiny-normal text-black">
                By subscribing, you agree to our Privacy Policy and consent to
                receive updates.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bottom footer section */}
      <div className="flex flex-col md:flex-row items-start gap-8 self-stretch w-full">
        <div className="flex flex-col md:flex-row justify-between items-start w-full">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <span className="w-fit font-text-small-normal text-black whitespace-nowrap">
              © 2025 Relume. All rights reserved.
            </span>

            {/* Map through legal links */}
            {legalLinks.map((link, index) => (
              <a
                key={index}
                href="#"
                className="w-fit font-text-small-link text-black underline whitespace-nowrap"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Social media icons */}
          <div className="flex items-start gap-3 mt-4 md:mt-0">
            {socialIcons.map((social, index) => (
              <a key={index} href="#" aria-label={social.alt}>
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
