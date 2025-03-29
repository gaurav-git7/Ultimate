import React from 'react';
import { Card, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { useNavigate } from 'react-router-dom';

export const DashboardPreview = () => {
  const navigate = useNavigate();

  // Mock data for bin status
  const bins = [
    { id: 1, name: 'Bin #1328', location: 'Main Street', fillLevel: 82, status: 'warning' },
    { id: 2, name: 'Bin #1452', location: 'Central Park', fillLevel: 45, status: 'normal' },
    { id: 3, name: 'Bin #1576', location: 'Business District', fillLevel: 93, status: 'critical' },
    { id: 4, name: 'Bin #1892', location: 'Riverside Walk', fillLevel: 24, status: 'normal' },
  ];

  // Mock data for analytics
  const analytics = {
    todayCollections: 14,
    weeklyAverage: 86,
    monthlyTrend: '+12%',
    efficiencyScore: 94
  };

  return (
    <div className="dashboard-preview bg-gray-100 p-6 rounded-lg shadow-lg border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold">Dashboard Preview</h3>
        <Button 
          variant="link" 
          className="text-primary" 
          onClick={() => navigate('/dashboard')}
        >
          Go to full dashboard →
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bin Status Panel */}
        <Card className="h-full">
          <CardContent className="p-4">
            <h4 className="text-lg font-semibold mb-3">Bin Status Overview</h4>
            <div className="space-y-3">
              {bins.map(bin => (
                <div key={bin.id} className="bin-item flex items-center p-2 border-b border-gray-100">
                  <div className="w-2 h-12 mr-3 rounded-full bg-gray-200">
                    <div 
                      className={`rounded-full ${
                        bin.status === 'critical' ? 'bg-red-500' : 
                        bin.status === 'warning' ? 'bg-yellow-500' : 'bg-green-500'
                      }`} 
                      style={{height: `${bin.fillLevel}%`}}
                    ></div>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{bin.name}</span>
                      <span className={`text-sm ${
                        bin.status === 'critical' ? 'text-red-500' : 
                        bin.status === 'warning' ? 'text-yellow-500' : 'text-green-500'
                      }`}>
                        {bin.fillLevel}%
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">{bin.location}</div>
                  </div>
                </div>
              ))}
            </div>
            <Button 
              className="w-full mt-4 bg-[#61e923] text-black hover:bg-green-600"
              onClick={() => navigate('/dustbin')}
            >
              View All Bins
            </Button>
          </CardContent>
        </Card>

        {/* Analytics Panel */}
        <Card className="h-full">
          <CardContent className="p-4">
            <h4 className="text-lg font-semibold mb-3">Performance Analytics</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="stat-card p-3 bg-blue-50 rounded-lg">
                <div className="text-sm text-gray-600">Today's Collections</div>
                <div className="text-2xl font-bold">{analytics.todayCollections}</div>
              </div>
              <div className="stat-card p-3 bg-green-50 rounded-lg">
                <div className="text-sm text-gray-600">Weekly Avg. Fill Rate</div>
                <div className="text-2xl font-bold">{analytics.weeklyAverage}%</div>
              </div>
              <div className="stat-card p-3 bg-purple-50 rounded-lg">
                <div className="text-sm text-gray-600">Monthly Trend</div>
                <div className="text-2xl font-bold text-green-600">{analytics.monthlyTrend}</div>
              </div>
              <div className="stat-card p-3 bg-yellow-50 rounded-lg">
                <div className="text-sm text-gray-600">Efficiency Score</div>
                <div className="text-2xl font-bold">{analytics.efficiencyScore}</div>
              </div>
            </div>
            
            {/* Mock Chart */}
            <div className="mt-4 p-3 border border-gray-200 rounded-lg bg-white">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Collection Trends</span>
                <div className="text-xs text-gray-500">Last 7 days</div>
              </div>
              <div className="h-24 flex items-end justify-between space-x-2">
                {[35, 58, 42, 78, 63, 92, 57].map((value, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-full bg-[#61e923] rounded-t-sm" 
                      style={{height: `${value}%`}}
                    ></div>
                    <span className="text-xs mt-1">{['M','T','W','T','F','S','S'][index]}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <Button 
              className="w-full mt-4 bg-primary text-white"
              onClick={() => navigate('/dashboard')}
            >
              View Full Analytics
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPreview; 