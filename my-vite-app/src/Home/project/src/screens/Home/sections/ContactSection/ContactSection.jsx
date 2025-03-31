import React, { useState } from "react";
import { Button } from "../../../../components/ui/button";
import { Card } from "../../../../components/ui/card";
import { Checkbox } from "../../../../components/ui/checkbox";
import { Input } from "../../../../components/ui/input";
import { Textarea } from "../../../../components/ui/textarea";
import { MapPin, Mail, Phone, Send, CheckCircle } from "lucide-react";

export const ContactSection = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
    terms: false
  });
  const [formStatus, setFormStatus] = useState(null); // null, 'submitting', 'success'

  // Handle form input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormState(prev => ({ ...prev, [id]: value }));
  };

  // Handle checkbox change
  const handleCheckboxChange = (checked) => {
    setFormState(prev => ({ ...prev, terms: checked }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.terms) return;
    
    setFormStatus('submitting');
    
    // Simulate API call
    setTimeout(() => {
      setFormStatus('success');
      setFormState({
        name: "",
        email: "",
        message: "",
        terms: false
      });
      
      // Reset form status after a delay
      setTimeout(() => {
        setFormStatus(null);
      }, 3000);
    }, 1500);
  };

  // Contact information
  const contactInfo = [
    {
      icon: <MapPin size={20} />,
      title: "Visit us",
      content: "123 Eco Street, Green City, 94123",
      color: "bg-blue-50 text-blue-600"
    },
    {
      icon: <Mail size={20} />,
      title: "Email us",
      content: "contact@smartwaste.com",
      color: "bg-purple-50 text-purple-600"
    },
    {
      icon: <Phone size={20} />,
      title: "Call us",
      content: "+1 (555) 123-4567",
      color: "bg-amber-50 text-amber-600"
    }
  ];

  return (
    <section id="contact-section" className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left side - Contact form */}
          <div className="relative">
            {/* Decorative elements */}
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-[#61e923]/10 rounded-full blur-xl -z-10"></div>
            
            <div className="max-w-lg">
              <div className="inline-block px-4 py-2 bg-[#61e923]/10 rounded-full text-[#4db31e] font-medium text-sm mb-6">
                GET IN TOUCH
              </div>
              
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                We'd love to hear from you
              </h2>
              
              <p className="text-gray-600 mb-10">
                Have questions about our smart waste management solutions? 
                Fill out the form below and our team will get back to you as soon as possible.
              </p>
              
              {/* Contact information cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                {contactInfo.map((info, index) => (
                  <div 
                    key={index} 
                    className="p-4 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group"
                  >
                    <div className={`${info.color} w-10 h-10 rounded-full flex items-center justify-center mb-3`}>
                      {info.icon}
                    </div>
                    <h3 className="text-sm font-medium text-gray-700 mb-1">
                      {info.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {info.content}
                    </p>
                  </div>
                ))}
              </div>
              
              {/* Social proof */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center overflow-hidden">
                      <img 
                        src={`/images/avatar-${i}.png`} 
                        alt="User" 
                        className="w-full h-full object-cover" 
                        onError={(e) => { e.target.src = '/images/image-5.png' }} 
                      />
                    </div>
                  ))}
                </div>
                <span className="text-sm text-gray-600">Joined by 2,000+ users</span>
              </div>
            </div>
          </div>
          
          {/* Right side - Contact form */}
          <div className="relative">
            <Card className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 relative z-10 transform transition-transform duration-500 hover:translate-y-[-5px]">
              {formStatus === 'success' ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-[#61e923]/20 flex items-center justify-center mb-6 animate-fade-in">
                    <CheckCircle className="w-8 h-8 text-[#4db31e]" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 animate-fade-in" style={{animationDelay: '0.1s'}}>
                    Message Sent!
                  </h3>
                  <p className="text-gray-600 max-w-sm animate-fade-in" style={{animationDelay: '0.2s'}}>
                    Thank you for reaching out. Our team will get back to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Name
                      </label>
                      <Input
                        id="name"
                        value={formState.name}
                        onChange={handleInputChange}
                        required
                        className="w-full rounded-lg border-gray-300 focus:border-[#61e923] focus:ring focus:ring-[#61e923]/20 transition-all duration-200"
                        placeholder="John Doe"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <Input
                        id="email"
                        type="email"
                        value={formState.email}
                        onChange={handleInputChange}
                        required
                        className="w-full rounded-lg border-gray-300 focus:border-[#61e923] focus:ring focus:ring-[#61e923]/20 transition-all duration-200"
                        placeholder="john@example.com"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Message
                      </label>
                      <Textarea
                        id="message"
                        value={formState.message}
                        onChange={handleInputChange}
                        required
                        className="w-full h-32 rounded-lg border-gray-300 focus:border-[#61e923] focus:ring focus:ring-[#61e923]/20 transition-all duration-200 resize-none"
                        placeholder="How can we help you with your waste management needs?"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <Checkbox
                        id="terms"
                        checked={formState.terms}
                        onCheckedChange={handleCheckboxChange}
                        className="h-4 w-4 text-[#61e923] focus:ring-[#61e923]/20 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="terms" className="text-gray-600">
                        I agree to the <a href="/terms" className="text-[#4db31e] hover:underline">Terms of Service</a> and <a href="/privacy" className="text-[#4db31e] hover:underline">Privacy Policy</a>
                      </label>
                    </div>
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={formStatus === 'submitting' || !formState.terms}
                    className="w-full bg-[#61e923] hover:bg-[#4db31e] text-white font-medium rounded-lg py-3 shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    {formStatus === 'submitting' ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send size={16} />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </Card>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#61e923]/10 rounded-full blur-xl -z-10"></div>
            <div className="absolute top-1/2 -right-6 w-12 h-12 rounded-full bg-[#61e923]/30 animate-float"></div>
            <div className="absolute bottom-1/3 -left-6 w-10 h-10 rounded-full bg-[#61e923]/20 animate-float" style={{animationDelay: '1.5s'}}></div>
          </div>
        </div>
      </div>
    </section>
  );
};