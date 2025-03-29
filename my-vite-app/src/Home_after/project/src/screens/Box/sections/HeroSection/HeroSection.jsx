import { ChevronRightIcon } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { Checkbox } from "../../../../components/ui/checkbox";
import { Input } from "../../../../components/ui/input";
import { Textarea } from "../../../../components/ui/textarea";
import { Avatar, AvatarImage } from "../../../../components/ui/avatar";
import { DashboardPreview } from "../../dashboard/DashboardPreview";
import "./HeroSection.css";

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
    image: "/images/new-images/waste-dashboard.jpg",
    title:
      "Track your waste generation patterns and enhance operational efficiency.",
    description:
      "Our advanced analytics provide actionable insights into waste management.",
    action: "Explore",
  },
  {
    image: "/images/new-images/recycling.jpg",
    title:
      "Gain insights with line charts and heatmaps for better decision-making.",
    description:
      "Visualize data trends to optimize waste collection and reduce costs.",
    action: "Analyze",
  },
  {
    image: "/images/new-images/smart-city.jpg",
    title:
      "Predict future waste trends with our intelligent forecasting tools.",
    description:
      "Stay ahead of waste management challenges with predictive analytics.",
    action: "Forecast",
  },
];

// Data for social media icons
const socialMediaIcons = [
  { src: "/images/icon---facebook.svg", alt: "Icon facebook" },
  { src: "/images/icon---instagram.svg", alt: "Icon instagram" },
  { src: "/images/icon---x.svg", alt: "Icon x" },
  { src: "/images/icon---linkedin.svg", alt: "Icon linkedin" },
  { src: "/images/icon---youtube.svg", alt: "Icon youtube" },
];

// Data for testimonials
const testimonials = [
  {
    quote: "Smart Bin has revolutionized our waste management system. We've reduced collection costs by 40% and improved sustainability metrics.",
    author: "Sarah Johnson",
    position: "Facility Manager, Green City Inc.",
    avatar: "/images/new-images/avatar-1.jpg"
  },
  {
    quote: "The real-time alerts and analytics have completely transformed how we handle waste. A game-changer for our municipality.",
    author: "David Chen",
    position: "Environmental Director, Metro Services",
    avatar: "/images/new-images/avatar-2.jpg"
  },
  {
    quote: "Implementation was seamless and the ROI was immediate. The dashboard is intuitive and provides all the data we need.",
    author: "Emily Rodriguez",
    position: "Sustainability Lead, EcoCampus University",
    avatar: "/images/new-images/avatar-3.jpg"
  }
];

// Stats data
const statsData = [
  { value: "40%", label: "Reduction in collection costs" },
  { value: "60%", label: "Improvement in route efficiency" },
  { value: "35%", label: "Less carbon emissions" },
  { value: "1000+", label: "Smart bins deployed" }
];

export const HeroSection = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col w-full bg-white">
      {/* Hero Section */}
      <section className="flex flex-col w-full items-center justify-center gap-20 px-16 py-28 bg-white">
        <div className="flex flex-col w-[768px] items-center gap-8 hero-animation">
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
            <Button 
              onClick={() => navigate('/dashboard')}
              className="px-6 py-3 bg-black border border-solid rounded-none h-auto btn-primary"
            >
              <span className="font-text-regular-normal font-[number:var(--text-regular-normal-font-weight)] text-white text-[length:var(--text-regular-normal-font-size)] tracking-[var(--text-regular-normal-letter-spacing)] leading-[var(--text-regular-normal-line-height)] whitespace-nowrap [font-style:var(--text-regular-normal-font-style)]">
                Dashboard
              </span>
            </Button>

            <Button 
              onClick={() => navigate('/dustbin')}
              className="px-6 py-3 bg-[#61e923] border border-solid border-black rounded-none h-auto"
            >
              <span className="font-text-regular-normal font-[number:var(--text-regular-normal-font-weight)] text-black text-[length:var(--text-regular-normal-font-size)] tracking-[var(--text-regular-normal-letter-spacing)] leading-[var(--text-regular-normal-line-height)] whitespace-nowrap [font-style:var(--text-regular-normal-font-style)]">
                View Bins
              </span>
            </Button>
          </div>
        </div>

        <img
          className="h-[738px] w-full object-cover rounded-lg shadow-lg"
          alt="Smart waste management system"
          src="/images/waste-bins-colored.jpg"
        />
      </section>

      {/* Stats Section */}
      <section className="flex w-full px-16 py-16 bg-gray-50">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full">
          {statsData.map((stat, index) => (
            <div key={index} className="flex flex-col items-center justify-center stat-card">
              <span className="stat-value">{stat.value}</span>
              <p className="stat-label">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>
      
      {/* Features Section */}
      <section className="flex w-full gap-12 px-16 py-24 flex-col items-center bg-white">
        <div className="text-center max-w-2xl mx-auto">
          <h3 className="text-[length:var(--heading-desktop-h3-font-size)] leading-[var(--heading-desktop-h3-line-height)] font-heading-desktop-h3 font-[number:var(--heading-desktop-h3-font-weight)] text-black tracking-[var(--heading-desktop-h3-letter-spacing)] [font-style:var(--heading-desktop-h3-font-style)]">
            Smart Features for Modern Waste Management
          </h3>
          <p className="mt-4 text-gray-600">Our comprehensive solution offers everything you need to optimize your waste management operations.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mt-8">
          <div className="feature-card">
            <div className="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h4 className="text-xl font-bold mb-3">Fill Level Monitoring</h4>
            <p className="text-gray-600">Track bin capacity in real-time with accurate sensors that measure fill levels and predict collection needs.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h4 className="text-xl font-bold mb-3">Smart Routing</h4>
            <p className="text-gray-600">Optimize collection routes based on bin fill status, traffic conditions, and priority levels.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h4 className="text-xl font-bold mb-3">Environmental Impact</h4>
            <p className="text-gray-600">Monitor and reduce carbon footprint with sustainability metrics and eco-friendly waste management practices.</p>
          </div>
        </div>
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
                      src="/images/icon---relume.svg"
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
                      src="/images/icon---relume.svg"
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
            className="flex-1 h-[640px] object-cover rounded-lg shadow-lg"
            alt="Dashboard showing waste bin data"
            src="/images/new-images/waste-dashboard.jpg"
          />
        </div>
      </section>

      {/* Real-time Alerts Section */}
      <section className="flex w-full gap-20 px-16 py-28 flex-col items-start bg-gray-50">
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
            
            <div className="mt-6">
              <Button 
                onClick={() => navigate('/notification')}
                className="px-6 py-3 bg-[#61e923] border border-solid border-black rounded-none h-auto"
              >
                <span className="font-text-regular-normal font-[number:var(--text-regular-normal-font-weight)] text-black text-[length:var(--text-regular-normal-font-size)] tracking-[var(--text-regular-normal-letter-spacing)] leading-[var(--text-regular-normal-line-height)] whitespace-nowrap [font-style:var(--text-regular-normal-font-style)]">
                  View Notifications
                </span>
              </Button>
            </div>
          </div>

          <img
            className="flex-1 h-[640px] object-cover rounded-lg shadow-lg"
            alt="Smart notifications panel"
            src="/images/new-images/recycling.jpg"
          />
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section className="flex w-full gap-10 px-16 py-28 flex-col items-center bg-white">
        <div className="text-center max-w-2xl mb-12">
          <h3 className="text-[length:var(--heading-desktop-h3-font-size)] leading-[var(--heading-desktop-h3-line-height)] font-heading-desktop-h3 font-[number:var(--heading-desktop-h3-font-weight)] text-black tracking-[var(--heading-desktop-h3-letter-spacing)] [font-style:var(--heading-desktop-h3-font-style)]">
            Your Waste Management at a Glance
          </h3>
          <p className="mt-4 text-gray-600">Experience our intuitive dashboard that puts all the information you need at your fingertips.</p>
        </div>
        
        <div className="w-full max-w-5xl">
          <DashboardPreview />
        </div>
      </section>

      {/* Analytics Section */}
      <section className="flex w-full gap-20 px-16 py-28 flex-col items-start bg-white">
        <h3 className="text-[length:var(--heading-desktop-h3-font-size)] leading-[var(--heading-desktop-h3-line-height)] font-heading-desktop-h3 font-[number:var(--heading-desktop-h3-font-weight)] text-black tracking-[var(--heading-desktop-h3-letter-spacing)] [font-style:var(--heading-desktop-h3-font-style)]">
          Visualize waste trends with our comprehensive analytics tools and
          insights.
        </h3>

        <div className="flex flex-col items-start gap-16 w-full">
          <div className="flex flex-wrap justify-center gap-12 w-full">
            {analyticsCardsData.map((card, index) => (
              <Card key={index} className="flex-1 min-w-[300px] border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardContent className="flex flex-col items-start gap-8 p-6">
                  <img
                    className="h-60 w-full object-cover rounded-md"
                    alt="Analytics visualization"
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
                        className="p-0 h-auto flex items-center gap-2 text-[#61e923] hover:text-green-700"
                      >
                        <span className="font-text-regular-normal font-[number:var(--text-regular-normal-font-weight)] tracking-[var(--text-regular-normal-letter-spacing)] leading-[var(--text-regular-normal-line-height)] [font-style:var(--text-regular-normal-font-style)]">
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

      {/* Testimonials Section */}
      <section className="flex w-full gap-12 px-16 py-28 flex-col items-center bg-gray-50">
        <h3 className="text-[length:var(--heading-desktop-h3-font-size)] leading-[var(--heading-desktop-h3-line-height)] font-heading-desktop-h3 font-[number:var(--heading-desktop-h3-font-weight)] text-black tracking-[var(--heading-desktop-h3-letter-spacing)] text-center [font-style:var(--heading-desktop-h3-font-style)]">
          Trusted by Waste Management Professionals
        </h3>
        
        <div className="flex flex-wrap justify-center gap-8 w-full">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="flex-1 min-w-[300px] max-w-[400px] border border-gray-200 rounded-lg shadow-md testimonial-card">
              <CardContent className="flex flex-col items-start gap-6 p-6">
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12 border-2 border-primary-100">
                    <AvatarImage 
                      src={testimonial.avatar} 
                      alt={testimonial.author} 
                    />
                  </Avatar>
                  <div>
                    <h6 className="testimonial-author">{testimonial.author}</h6>
                    <p className="testimonial-position">{testimonial.position}</p>
            </div>
          </div>
                <p className="testimonial-quote">"{testimonial.quote}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="flex w-full px-16 py-20 bg-black cta-section">
        <div className="mx-auto max-w-3xl flex flex-col items-center gap-8 text-center">
          <h2 className="cta-title">Ready to transform your waste management?</h2>
          <p className="cta-description">Join hundreds of organizations that have already upgraded to Smart Waste Management.</p>
          <div className="flex gap-4 items-center">
            <Button 
              onClick={() => navigate('/dashboard')}
              className="px-8 py-4 bg-[#61e923] border-none rounded-md h-auto btn-primary"
            >
              <span className="font-medium text-black">
                Get Started Now
              </span>
            </Button>
            <Button 
              variant="outline"
              className="px-8 py-4 bg-transparent border border-white rounded-md h-auto btn-secondary"
            >
              <span className="font-medium text-white">
                Contact Sales
              </span>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="flex flex-col w-full items-start gap-12 px-16 py-20 bg-gray-900">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 w-full">
          <div className="flex flex-col items-start gap-6">
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="h-10 w-10 bg-[#61e923] rounded-lg shadow-sm flex items-center justify-center">
                <img
                  className="w-6 h-6 object-contain"
                  alt="Logo"
                  src="/images/new-images/smart-city.jpg"
                />
              </div>
              <span className="font-bold text-xl text-white">Smart Waste</span>
            </div>
            <p className="text-gray-400">
              Revolutionizing waste management with smart technology and real-time analytics.
            </p>
            <div className="flex gap-4">
              {socialMediaIcons.map((icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#61e923] transition-colors social-icon"
                >
                  <img src={icon.src} alt={icon.alt} className="w-5 h-5" />
                </a>
                ))}
              </div>
            </div>

          <div className="flex flex-col items-start gap-6">
            <h5 className="text-lg font-bold text-white">Quick Links</h5>
            <div className="flex flex-col gap-3">
              {quickLinksData.map((link, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-gray-400 hover:text-[#61e923] transition-colors footer-link"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-start gap-6">
            <h5 className="text-lg font-bold text-white">Resources</h5>
            <div className="flex flex-col gap-3">
              {resourcesData.map((resource, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-gray-400 hover:text-[#61e923] transition-colors footer-link"
                >
                  {resource}
                </a>
              ))}
            </div>
            </div>

          <div className="flex flex-col items-start gap-6">
            <h5 className="text-lg font-bold text-white">Subscribe</h5>
            <p className="text-gray-400">
              Stay updated with our latest news and features.
            </p>
            <div className="flex w-full">
                <Input
                className="flex-1 bg-gray-800 border-0 text-white rounded-r-none"
                  placeholder="Your Email"
                />
              <Button className="bg-[#61e923] text-black rounded-l-none">
                    Subscribe
                </Button>
            </div>
          </div>
        </div>

        <div className="w-full border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row md:justify-between gap-4">
            <p className="text-gray-500 text-sm">
              © 2023 Smart Waste Management. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-500 hover:text-[#61e923] text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-500 hover:text-[#61e923] text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-gray-500 hover:text-[#61e923] text-sm">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};