import React from "react";

export const MainContentSection = () => {
  // Notification types for showcasing the alert system
  const notificationTypes = [
    {
      color: "#FF5A5F",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
        </svg>
      ),
      title: "Critical Alerts",
      description: "Immediate attention required for bin overflow or hazardous conditions"
    },
    {
      color: "#FF9F1C",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-.53 14.03a.75.75 0 0 0 1.06 0l3-3a.75.75 0 1 0-1.06-1.06l-1.72 1.72V8.25a.75.75 0 0 0-1.5 0v5.69l-1.72-1.72a.75.75 0 0 0-1.06 1.06l3 3Z" clipRule="evenodd" />
        </svg>
      ),
      title: "Warning Notifications",
      description: "Bins approaching capacity or requiring maintenance soon"
    },
    {
      color: "#2EC4B6",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
        </svg>
      ),
      title: "Status Updates",
      description: "Regular reports on bin conditions and collection schedules"
    }
  ];

  return (
    <section id="main-section" className="py-28 bg-gradient-to-b from-[#f8fff5] to-white overflow-hidden">
      <div className="container mx-auto px-6 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <div className="order-2 lg:order-1 relative">
            {/* Decorative elements */}
            <div className="absolute -top-16 -left-16 w-32 h-32 bg-[#61e923]/10 rounded-full blur-xl"></div>
            <div className="absolute -bottom-20 right-20 w-24 h-24 bg-[#61e923]/15 rounded-full blur-lg"></div>
            
            <div className="relative z-10">
              {/* Section tag */}
              <div className="inline-block px-4 py-2 bg-[#61e923]/10 rounded-full text-[#4db31e] font-medium text-sm mb-6">
                SMART NOTIFICATIONS
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Stay informed with real-time alerts for optimal waste management
              </h2>

              <p className="text-gray-600 text-lg leading-relaxed mb-10">
                Our Smart Notifications Panel keeps you updated on bin status with
                color-coded alerts. Receive timely notifications for overfilling,
                moisture issues, and maintenance needs to ensure efficient waste
                management.
              </p>
              
              {/* Notification types display */}
              <div className="space-y-6">
                {notificationTypes.map((notification, index) => (
                  <div 
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow duration-300 border-l-4"
                    style={{ borderLeftColor: notification.color }}
                  >
                    <div className="shrink-0 p-2 rounded-full" style={{ backgroundColor: `${notification.color}20`, color: notification.color }}>
                      {notification.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{notification.title}</h4>
                      <p className="text-gray-600 text-sm">{notification.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Call to action */}
              <div className="mt-10">
                <button className="inline-flex items-center gap-2 px-6 py-3 bg-[#61e923] hover:bg-[#4db31e] text-white rounded-lg shadow-lg transition-all duration-300">
                  <span className="font-medium">Configure Notifications</span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path d="M10 3.75a2 2 0 10-4 0 2 2 0 004 0zM17.25 4.5a.75.75 0 000-1.5h-5.5a.75.75 0 000 1.5h5.5zM5 3.75a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5a.75.75 0 01.75.75zM4.25 17a.75.75 0 000-1.5h-1.5a.75.75 0 000 1.5h1.5zM17.25 17a.75.75 0 000-1.5h-5.5a.75.75 0 000 1.5h5.5zM9 10a.75.75 0 01-.75.75h-5.5a.75.75 0 010-1.5h5.5A.75.75 0 019 10zM17.25 10.75a.75.75 0 000-1.5h-1.5a.75.75 0 000 1.5h1.5zM14 10a2 2 0 10-4 0 2 2 0 004 0zM10 16.25a2 2 0 10-4 0 2 2 0 004 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          {/* Image with Interactive Elements */}
          <div className="order-1 lg:order-2 relative perspective-component">
            {/* Phone mockup */}
            <div className="relative z-10 mx-auto max-w-sm lg:max-w-md transform perspective-tilt hover:perspective-flat transition-all duration-700">
              <div className="relative rounded-[40px] overflow-hidden border-8 border-gray-900 shadow-2xl">
                {/* App screen */}
                <img
                  className="w-full h-auto"
                  alt="Person using waste management app on smartphone"
                  src="/images/placeholder-image-2.png"
                  onError={(e) => { e.target.src = 'https://placehold.co/400x720/e8fbde/61e923?text=Smart+Notifications' }}
                />
                
                {/* Interactive notification elements */}
                <div className="absolute inset-0 pointer-events-none">
                  {/* Notification 1 - animated */}
                  <div className="absolute top-[20%] left-[5%] right-[5%] bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg animate-slide-in" style={{animationDelay: '0.5s'}}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#FF5A5F]/20">
                        <div className="w-6 h-6 text-[#FF5A5F]">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-gray-900">Bin #342 - Critical Alert</div>
                        <div className="text-xs text-gray-600">Overflow detected - 98% capacity reached</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Notification 2 - animated */}
                  <div className="absolute top-[40%] left-[5%] right-[5%] bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg animate-slide-in" style={{animationDelay: '1s'}}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#FF9F1C]/20">
                        <div className="w-6 h-6 text-[#FF9F1C]">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-.53 14.03a.75.75 0 0 0 1.06 0l3-3a.75.75 0 1 0-1.06-1.06l-1.72 1.72V8.25a.75.75 0 0 0-1.5 0v5.69l-1.72-1.72a.75.75 0 0 0-1.06 1.06l3 3Z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-gray-900">Bin #129 - Warning</div>
                        <div className="text-xs text-gray-600">Approaching capacity (82%) - Schedule pickup</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Notification 3 - animated */}
                  <div className="absolute top-[60%] left-[5%] right-[5%] bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg animate-slide-in" style={{animationDelay: '1.5s'}}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#2EC4B6]/20">
                        <div className="w-6 h-6 text-[#2EC4B6]">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-gray-900">Bin #207 - Status Update</div>
                        <div className="text-xs text-gray-600">Successfully emptied - Next pickup in 3 days</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Phone elements */}
                <div className="absolute top-3 left-0 right-0 flex justify-center">
                  <div className="w-32 h-5 bg-gray-900 rounded-full"></div>
                </div>
                <div className="absolute bottom-1 left-0 right-0 flex justify-center">
                  <div className="w-24 h-1 bg-gray-400 rounded-full"></div>
                </div>
              </div>
              
              {/* Phone shadow/reflection */}
              <div className="absolute -bottom-8 left-0 right-0 h-8 bg-gradient-to-b from-gray-900/50 to-transparent blur-md rounded-full mx-8"></div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-10 right-10 w-20 h-20 rounded-full bg-[#61e923]/10 animate-float"></div>
            <div className="absolute bottom-20 -left-10 w-16 h-16 rounded-full bg-[#61e923]/20 animate-float" style={{animationDelay: '1.5s'}}></div>
          </div>
        </div>
      </div>
      
      {/* Add subtle wave divider at bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-8" viewBox="0 0 1200 30" preserveAspectRatio="none">
          <path d="M0,0 C300,20 600,30 1200,10 L1200,30 L0,30 Z" fill="#f8fff5" />
        </svg>
      </div>
    </section>
  );
};