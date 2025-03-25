import { ChevronRightIcon } from "lucide-react";
import React from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { Checkbox } from "../../../../components/ui/checkbox";
import { Input } from "../../../../components/ui/input";
import { Textarea } from "../../../../components/ui/textarea";

// Data for quick links section
const quickLinksData = [
  "About Us",
  "Contact Us",
  "Support Center",
  "Blog Posts",
  "FAQs",
];

// Data for resources section
const resourcesData = [
  "Case Studies",
  "White Papers",
  "Webinars",
  "User Guides",
  "Community Forum",
];

// Data for stay connected section
const stayConnectedData = [
  "Social Media",
  "Newsletter",
  "Feedback",
  "Careers",
  "Events",
];

// Data for analytics cards
const analyticsCardsData = [
  {
    image: "/placeholder-image-3.png",
    title:
      "Track your waste generation patterns and enhance operational efficiency.",
    description:
      "Our advanced analytics provide actionable insights into waste management.",
    action: "Explore",
  },
  {
    image: "/placeholder-image-4.png",
    title:
      "Gain insights with line charts and heatmaps for better decision-making.",
    description:
      "Visualize data trends to optimize waste collection and reduce costs.",
    action: "Analyze",
  },
  {
    image: "/placeholder-image-5.png",
    title:
      "Predict future waste trends with our intelligent forecasting tools.",
    description:
      "Stay ahead of waste management challenges with predictive analytics.",
    action: "Forecast",
  },
];

// Data for social media icons
const socialMediaIcons = [
  { src: "/icon---facebook.svg", alt: "Icon facebook" },
  { src: "/icon---instagram.svg", alt: "Icon instagram" },
  { src: "/icon---x.svg", alt: "Icon x" },
  { src: "/icon---linkedin.svg", alt: "Icon linkedin" },
  { src: "/icon---youtube.svg", alt: "Icon youtube" },
];

export const HeroSection = () => {
  return (
    <div className="flex flex-col w-full bg-white">
      {/* Hero Section */}
      <section className="flex flex-col w-full items-center justify-center gap-20 px-16 py-28 bg-white">
        <div className="flex flex-col w-[768px] items-center gap-8">
          <div className="flex flex-col items-center gap-6 w-full">
            <h1 className="w-full font-heading-desktop-h1 font-[number:var(--heading-desktop-h1-font-weight)] text-black text-[length:var(--heading-desktop-h1-font-size)] text-center tracking-[var(--heading-desktop-h1-letter-spacing)] leading-[var(--heading-desktop-h1-line-height)] [font-style:var(--heading-desktop-h1-font-style)]">
              Transform Waste Management with Smart Solutions
            </h1>

            <p className="w-full font-text-medium-normal font-[number:var(--text-medium-normal-font-weight)] text-black text-[length:var(--text-medium-normal-font-size)] text-center tracking-[var(--text-medium-normal-letter-spacing)] leading-[var(--text-medium-normal-line-height)] [font-style:var(--text-medium-normal-font-style)]">
              Our innovative smart waste bin system offers real-time monitoring
              and analytics to streamline waste management. Experience
              efficiency and sustainability like never before.
            </p>
          </div>

          <div className="flex gap-4 items-start">
            <Button className="px-6 py-3 bg-black border border-solid rounded-none h-auto">
              <span className="font-text-regular-normal font-[number:var(--text-regular-normal-font-weight)] text-white text-[length:var(--text-regular-normal-font-size)] tracking-[var(--text-regular-normal-letter-spacing)] leading-[var(--text-regular-normal-line-height)] whitespace-nowrap [font-style:var(--text-regular-normal-font-style)]">
                Get Started
              </span>
            </Button>

            <Button className="px-6 py-3 bg-[#61e923] border border-solid border-black rounded-none h-auto">
              <span className="font-text-regular-normal font-[number:var(--text-regular-normal-font-weight)] text-black text-[length:var(--text-regular-normal-font-size)] tracking-[var(--text-regular-normal-letter-spacing)] leading-[var(--text-regular-normal-line-height)] whitespace-nowrap [font-style:var(--text-regular-normal-font-style)]">
                Learn More
              </span>
            </Button>
          </div>
        </div>

        <img
          className="h-[738px] w-full object-cover"
          alt="Placeholder image"
          src="/placeholder-image.png"
        />
      </section>

      {/* Real-Time Monitoring Section */}
      <section className="flex w-full gap-20 px-16 py-28 flex-col items-start bg-white">
        <div className="flex items-center gap-20 w-full">
          <div className="flex flex-col items-start gap-8 flex-1">
            <div className="flex flex-col items-start gap-6 w-full">
              <h3 className="w-full text-[length:var(--heading-desktop-h3-font-size)] leading-[var(--heading-desktop-h3-line-height)] font-heading-desktop-h3 font-[number:var(--heading-desktop-h3-font-weight)] text-black tracking-[var(--heading-desktop-h3-letter-spacing)] [font-style:var(--heading-desktop-h3-font-style)]">
                Real-Time Monitoring: Stay Updated with Live Waste Bin Data
              </h3>

              <p className="w-full font-text-medium-normal font-[number:var(--text-medium-normal-font-weight)] text-black text-[length:var(--text-medium-normal-font-size)] tracking-[var(--text-medium-normal-letter-spacing)] leading-[var(--text-medium-normal-line-height)] [font-style:var(--text-medium-normal-font-style)]">
                Our dashboard provides real-time insights into bin fill levels
                and moisture content. Monitor your waste management system
                effortlessly with dynamic updates.
              </p>
            </div>

            <div className="flex flex-col items-start gap-4 w-full">
              <div className="flex gap-6 py-2 w-full">
                <Card className="flex-1 border-none shadow-none">
                  <CardContent className="flex flex-col items-start gap-4 p-0">
                    <img
                      className="w-12 h-12"
                      alt="Icon relume"
                      src="/icon---relume.svg"
                    />

                    <h6 className="w-full font-heading-desktop-h6 font-[number:var(--heading-desktop-h6-font-weight)] text-black text-[length:var(--heading-desktop-h6-font-size)] tracking-[var(--heading-desktop-h6-letter-spacing)] leading-[var(--heading-desktop-h6-line-height)] [font-style:var(--heading-desktop-h6-font-style)]">
                      Live Data
                    </h6>

                    <p className="w-full font-text-regular-normal font-[number:var(--text-regular-normal-font-weight)] text-black text-[length:var(--text-regular-normal-font-size)] tracking-[var(--text-regular-normal-letter-spacing)] leading-[var(--text-regular-normal-line-height)] [font-style:var(--text-regular-normal-font-style)]">
                      Animated progress bars and interactive charts visualize
                      your waste management in real-time.
                    </p>
                  </CardContent>
                </Card>

                <Card className="flex-1 border-none shadow-none">
                  <CardContent className="flex flex-col items-start gap-4 p-0">
                    <img
                      className="w-12 h-12"
                      alt="Icon relume"
                      src="/icon---relume.svg"
                    />

                    <h6 className="w-full font-heading-desktop-h6 font-[number:var(--heading-desktop-h6-font-weight)] text-black text-[length:var(--heading-desktop-h6-font-size)] tracking-[var(--heading-desktop-h6-letter-spacing)] leading-[var(--heading-desktop-h6-line-height)] [font-style:var(--heading-desktop-h6-font-style)]">
                      Dynamic Updates
                    </h6>

                    <p className="w-full font-text-regular-normal font-[number:var(--text-regular-normal-font-weight)] text-black text-[length:var(--text-regular-normal-font-size)] tracking-[var(--text-regular-normal-letter-spacing)] leading-[var(--text-regular-normal-line-height)] [font-style:var(--text-regular-normal-font-style)]">
                      Experience seamless data refreshes that keep you informed
                      of bin status.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          <img
            className="flex-1 h-[640px] object-cover"
            alt="Placeholder image"
            src="/placeholder-image-1.png"
          />
        </div>
      </section>

      {/* Real-time Alerts Section */}
      <section className="flex w-full gap-20 px-16 py-28 flex-col items-start bg-white">
        <div className="flex items-center gap-20 w-full">
          <div className="flex flex-col items-start gap-6 flex-1">
            <h3 className="w-full text-[length:var(--heading-desktop-h3-font-size)] leading-[var(--heading-desktop-h3-line-height)] font-heading-desktop-h3 font-[number:var(--heading-desktop-h3-font-weight)] text-black tracking-[var(--heading-desktop-h3-letter-spacing)] [font-style:var(--heading-desktop-h3-font-style)]">
              Stay informed with real-time alerts for optimal waste management.
            </h3>

            <p className="w-full font-text-medium-normal font-[number:var(--text-medium-normal-font-weight)] text-black text-[length:var(--text-medium-normal-font-size)] tracking-[var(--text-medium-normal-letter-spacing)] leading-[var(--text-medium-normal-line-height)] [font-style:var(--text-medium-normal-font-style)]">
              Our Smart Notifications Panel keeps you updated on bin status with
              color-coded alerts. Receive timely notifications for overfilling,
              moisture issues, and maintenance needs to ensure efficient waste
              management.
            </p>
          </div>

          <img
            className="flex-1 h-[640px] object-cover"
            alt="Placeholder image"
            src="/placeholder-image-2.png"
          />
        </div>
      </section>

      {/* Analytics Section */}
      <section className="flex w-full gap-20 px-16 py-28 flex-col items-start bg-white">
        <h3 className="w-[768px] text-[length:var(--heading-desktop-h3-font-size)] leading-[var(--heading-desktop-h3-line-height)] font-heading-desktop-h3 font-[number:var(--heading-desktop-h3-font-weight)] text-black tracking-[var(--heading-desktop-h3-letter-spacing)] [font-style:var(--heading-desktop-h3-font-style)]">
          Visualize waste trends with our comprehensive analytics tools and
          insights.
        </h3>

        <div className="flex flex-col items-start gap-16 w-full">
          <div className="flex justify-center gap-12 w-full">
            {analyticsCardsData.map((card, index) => (
              <Card key={index} className="flex-1 border-none shadow-none">
                <CardContent className="flex flex-col items-start gap-8 p-0">
                  <img
                    className="h-60 w-full object-cover"
                    alt="Placeholder image"
                    src={card.image}
                  />

                  <div className="flex flex-col items-start gap-8 w-full">
                    <div className="flex flex-col items-start gap-4 w-full">
                      <h5 className="w-full text-[length:var(--heading-desktop-h5-font-size)] leading-[var(--heading-desktop-h5-line-height)] font-heading-desktop-h5 font-[number:var(--heading-desktop-h5-font-weight)] text-black tracking-[var(--heading-desktop-h5-letter-spacing)] [font-style:var(--heading-desktop-h5-font-style)]">
                        {card.title}
                      </h5>

                      <p className="w-full font-text-regular-normal font-[number:var(--text-regular-normal-font-weight)] text-black text-[length:var(--text-regular-normal-font-size)] tracking-[var(--text-regular-normal-letter-spacing)] leading-[var(--text-regular-normal-line-height)] [font-style:var(--text-regular-normal-font-style)]">
                        {card.description}
                      </p>
                    </div>

                    <div className="flex flex-col items-start gap-2 w-full">
                      <Button
                        variant="link"
                        className="p-0 h-auto flex items-center gap-2"
                      >
                        <span className="font-text-regular-normal font-[number:var(--text-regular-normal-font-weight)] text-black text-[length:var(--text-regular-normal-font-size)] tracking-[var(--text-regular-normal-letter-spacing)] leading-[var(--text-regular-normal-line-height)] [font-style:var(--text-regular-normal-font-style)]">
                          {card.action}
                        </span>
                        <ChevronRightIcon className="w-6 h-6" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="flex w-full gap-20 px-16 py-28 flex-col items-start bg-white">
        <div className="flex items-start gap-20 w-full">
          <div className="flex flex-col items-start gap-6 flex-1">
            <h2 className="w-full text-[length:var(--heading-desktop-h2-font-size)] leading-[var(--heading-desktop-h2-line-height)] font-heading-desktop-h2 font-[number:var(--heading-desktop-h2-font-weight)] text-black tracking-[var(--heading-desktop-h2-letter-spacing)] [font-style:var(--heading-desktop-h2-font-style)]">
              Join the Smart Waste Revolution
            </h2>
          </div>

          <div className="flex flex-col items-start gap-8 flex-1">
            <p className="w-full font-text-medium-normal font-[number:var(--text-medium-normal-font-weight)] text-black text-[length:var(--text-medium-normal-font-size)] tracking-[var(--text-medium-normal-letter-spacing)] leading-[var(--text-medium-normal-line-height)] [font-style:var(--text-medium-normal-font-style)]">
              Transform your waste management practices by integrating our smart
              monitoring system. Experience efficiency and sustainability like
              never before.
            </p>

            <div className="flex gap-4 items-start">
              <Button className="px-6 py-3 bg-black border border-solid rounded-none h-auto">
                <span className="font-text-regular-normal font-[number:var(--text-regular-normal-font-weight)] text-white text-[length:var(--text-regular-normal-font-size)] tracking-[var(--text-regular-normal-letter-spacing)] leading-[var(--text-regular-normal-line-height)] whitespace-nowrap [font-style:var(--text-regular-normal-font-style)]">
                  Get Started
                </span>
              </Button>

              <Button
                variant="outline"
                className="px-6 py-3 border border-solid border-black rounded-none h-auto"
              >
                <span className="font-text-regular-normal font-[number:var(--text-regular-normal-font-weight)] text-black text-[length:var(--text-regular-normal-font-size)] tracking-[var(--text-regular-normal-letter-spacing)] leading-[var(--text-regular-normal-line-height)] whitespace-nowrap [font-style:var(--text-regular-normal-font-style)]">
                  Contact Us
                </span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="flex flex-col w-full items-start gap-12 px-16 py-28 bg-white">
        <div className="w-[768px]">
          <div className="flex flex-col w-full items-start gap-4">
            <div className="flex items-center w-full">
              <span className="font-heading-desktop-tagline font-[number:var(--heading-desktop-tagline-font-weight)] text-black text-[length:var(--heading-desktop-tagline-font-size)] tracking-[var(--heading-desktop-tagline-letter-spacing)] leading-[var(--heading-desktop-tagline-line-height)] whitespace-nowrap [font-style:var(--heading-desktop-tagline-font-style)]">
                Connect
              </span>
            </div>

            <div className="flex flex-col items-start gap-6 w-full">
              <h2 className="w-full text-[length:var(--heading-desktop-h2-font-size)] leading-[var(--heading-desktop-h2-line-height)] font-heading-desktop-h2 font-[number:var(--heading-desktop-h2-font-weight)] text-black tracking-[var(--heading-desktop-h2-letter-spacing)] [font-style:var(--heading-desktop-h2-font-style)]">
                Get in Touch
              </h2>

              <p className="w-full font-text-medium-normal font-[number:var(--text-medium-normal-font-weight)] text-black text-[length:var(--text-medium-normal-font-size)] tracking-[var(--text-medium-normal-letter-spacing)] leading-[var(--text-medium-normal-line-height)] [font-style:var(--text-medium-normal-font-style)]">
                We'd love to hear from you. Reach out!
              </p>
            </div>
          </div>

          <div className="flex flex-col w-[560px] gap-6 mt-12">
            <div className="flex flex-col items-start gap-2 w-full">
              <label className="w-full font-text-regular-normal font-[number:var(--text-regular-normal-font-weight)] text-black text-[length:var(--text-regular-normal-font-size)] tracking-[var(--text-regular-normal-letter-spacing)] leading-[var(--text-regular-normal-line-height)] [font-style:var(--text-regular-normal-font-style)]">
                Name
              </label>
              <Input className="p-3 border border-solid border-black rounded-none" />
            </div>

            <div className="flex flex-col items-start gap-2 w-full">
              <label className="w-full font-text-regular-normal font-[number:var(--text-regular-normal-font-weight)] text-black text-[length:var(--text-regular-normal-font-size)] tracking-[var(--text-regular-normal-letter-spacing)] leading-[var(--text-regular-normal-line-height)] [font-style:var(--text-regular-normal-font-style)]">
                Email
              </label>
              <Input className="p-3 border border-solid border-black rounded-none" />
            </div>

            <div className="flex flex-col items-start gap-2 w-full">
              <label className="w-full font-text-regular-normal font-[number:var(--text-regular-normal-font-weight)] text-black text-[length:var(--text-regular-normal-font-size)] tracking-[var(--text-regular-normal-letter-spacing)] leading-[var(--text-regular-normal-line-height)] [font-style:var(--text-regular-normal-font-style)]">
                Message
              </label>
              <Textarea
                className="h-[182px] p-3 border border-solid border-black rounded-none"
                placeholder="Type your message..."
              />
            </div>

            <div className="flex items-center gap-2 pt-0 pb-4">
              <Checkbox
                id="terms"
                className="w-5 h-5 rounded-none border-black bg-white"
              />
              <label
                htmlFor="terms"
                className="font-text-small-normal font-[number:var(--text-small-normal-font-weight)] text-black text-[length:var(--text-small-normal-font-size)] tracking-[var(--text-small-normal-letter-spacing)] leading-[var(--text-small-normal-line-height)] [font-style:var(--text-small-normal-font-style)]"
              >
                I accept the Terms
              </label>
            </div>

            <Button className="px-6 py-3 bg-black border border-solid rounded-none h-auto w-fit">
              <span className="font-text-regular-normal font-[number:var(--text-regular-normal-font-weight)] text-white text-[length:var(--text-regular-normal-font-size)] tracking-[var(--text-regular-normal-letter-spacing)] leading-[var(--text-regular-normal-line-height)] whitespace-nowrap [font-style:var(--text-regular-normal-font-style)]">
                Submit
              </span>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="w-full flex flex-col items-center gap-8 px-16 py-20 bg-white">
        <div className="flex items-start gap-32 p-12 w-full bg-white border border-solid border-black">
          <div className="flex items-start gap-10 flex-1">
            {/* Quick Links */}
            <div className="flex flex-col items-start gap-4 flex-1">
              <h4 className="w-full font-text-regular-semi-bold font-[number:var(--text-regular-semi-bold-font-weight)] text-black text-[length:var(--text-regular-semi-bold-font-size)] tracking-[var(--text-regular-semi-bold-letter-spacing)] leading-[var(--text-regular-semi-bold-line-height)] [font-style:var(--text-regular-semi-bold-font-style)]">
                Quick Links
              </h4>

              <div className="w-full flex flex-col">
                {quickLinksData.map((link, index) => (
                  <div key={index} className="flex items-start py-2 w-full">
                    <span className="flex-1 font-text-small-normal font-[number:var(--text-small-normal-font-weight)] text-black text-[length:var(--text-small-normal-font-size)] tracking-[var(--text-small-normal-letter-spacing)] leading-[var(--text-small-normal-line-height)] [font-style:var(--text-small-normal-font-style)]">
                      {link}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Resources */}
            <div className="flex flex-col items-start gap-4 flex-1">
              <h4 className="w-full font-text-regular-semi-bold font-[number:var(--text-regular-semi-bold-font-weight)] text-black text-[length:var(--text-regular-semi-bold-font-size)] tracking-[var(--text-regular-semi-bold-letter-spacing)] leading-[var(--text-regular-semi-bold-line-height)] [font-style:var(--text-regular-semi-bold-font-style)]">
                Resources
              </h4>

              <div className="w-full flex flex-col">
                {resourcesData.map((resource, index) => (
                  <div key={index} className="flex items-start py-2 w-full">
                    <span className="flex-1 font-text-small-normal font-[number:var(--text-small-normal-font-weight)] text-black text-[length:var(--text-small-normal-font-size)] tracking-[var(--text-small-normal-letter-spacing)] leading-[var(--text-small-normal-line-height)] [font-style:var(--text-small-normal-font-style)]">
                      {resource}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stay Connected */}
            <div className="flex flex-col items-start gap-4 flex-1">
              <h4 className="w-full font-text-regular-semi-bold font-[number:var(--text-regular-semi-bold-font-weight)] text-black text-[length:var(--text-regular-semi-bold-font-size)] tracking-[var(--text-regular-semi-bold-letter-spacing)] leading-[var(--text-regular-semi-bold-line-height)] [font-style:var(--text-regular-semi-bold-font-style)]">
                Stay Connected
              </h4>

              <div className="w-full flex flex-col">
                {stayConnectedData.map((item, index) => (
                  <div key={index} className="flex items-start py-2 w-full">
                    <span className="flex-1 font-text-small-normal font-[number:var(--text-small-normal-font-weight)] text-black text-[length:var(--text-small-normal-font-size)] tracking-[var(--text-small-normal-letter-spacing)] leading-[var(--text-small-normal-line-height)] [font-style:var(--text-small-normal-font-style)]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Subscribe */}
          <div className="flex flex-col w-[400px] items-start gap-6">
            <div className="flex flex-col items-start gap-4 w-full">
              <h4 className="w-full font-text-regular-semi-bold font-[number:var(--text-regular-semi-bold-font-weight)] text-black text-[length:var(--text-regular-semi-bold-font-size)] tracking-[var(--text-regular-semi-bold-letter-spacing)] leading-[var(--text-regular-semi-bold-line-height)] [font-style:var(--text-regular-semi-bold-font-style)]">
                Subscribe
              </h4>

              <p className="w-full font-text-regular-normal font-[number:var(--text-regular-normal-font-weight)] text-black text-[length:var(--text-regular-normal-font-size)] tracking-[var(--text-regular-normal-letter-spacing)] leading-[var(--text-regular-normal-line-height)] [font-style:var(--text-regular-normal-font-style)]">
                Join our newsletter to stay updated on features and releases.
              </p>
            </div>

            <div className="flex flex-col gap-3 w-full">
              <div className="flex gap-4 w-full">
                <Input
                  className="flex-1 p-3 border border-solid border-black rounded-none"
                  placeholder="Your Email"
                />

                <Button className="px-6 py-3 bg-[#61e923] border border-solid border-black rounded-none h-auto">
                  <span className="font-text-regular-normal font-[number:var(--text-regular-normal-font-weight)] text-black text-[length:var(--text-regular-normal-font-size)] tracking-[var(--text-regular-normal-letter-spacing)] leading-[var(--text-regular-normal-line-height)] whitespace-nowrap [font-style:var(--text-regular-normal-font-style)]">
                    Subscribe
                  </span>
                </Button>
              </div>

              <p className="w-full font-text-tiny-normal font-[number:var(--text-tiny-normal-font-weight)] text-black text-[length:var(--text-tiny-normal-font-size)] tracking-[var(--text-tiny-normal-letter-spacing)] leading-[var(--text-tiny-normal-line-height)] [font-style:var(--text-tiny-normal-font-style)]">
                By subscribing, you agree to our Privacy Policy and consent to
                receive updates.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start gap-8 w-full">
          <div className="flex justify-between items-start w-full">
            <div className="flex items-center gap-6">
              <span className="font-text-small-normal font-[number:var(--text-small-normal-font-weight)] text-black text-[length:var(--text-small-normal-font-size)] tracking-[var(--text-small-normal-letter-spacing)] leading-[var(--text-small-normal-line-height)] whitespace-nowrap [font-style:var(--text-small-normal-font-style)]">
                © 2025 Relume. All rights reserved.
              </span>

              <a
                href="#"
                className="font-text-small-link font-[number:var(--text-small-link-font-weight)] text-black text-[length:var(--text-small-link-font-size)] tracking-[var(--text-small-link-letter-spacing)] leading-[var(--text-small-link-line-height)] underline whitespace-nowrap [font-style:var(--text-small-link-font-style)]"
              >
                Privacy Policy
              </a>

              <a
                href="#"
                className="font-text-small-link font-[number:var(--text-small-link-font-weight)] text-black text-[length:var(--text-small-link-font-size)] tracking-[var(--text-small-link-letter-spacing)] leading-[var(--text-small-link-line-height)] underline whitespace-nowrap [font-style:var(--text-small-link-font-style)]"
              >
                Terms of Service
              </a>

              <a
                href="#"
                className="font-text-small-link font-[number:var(--text-small-link-font-weight)] text-black text-[length:var(--text-small-link-font-size)] tracking-[var(--text-small-link-letter-spacing)] leading-[var(--text-small-link-line-height)] underline whitespace-nowrap [font-style:var(--text-small-link-font-style)]"
              >
                Cookie Settings
              </a>
            </div>

            <div className="flex items-start gap-3">
              {socialMediaIcons.map((icon, index) => (
                <img
                  key={index}
                  className="w-6 h-6"
                  alt={icon.alt}
                  src={icon.src}
                />
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};