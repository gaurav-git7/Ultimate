import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart3Icon, 
  LineChartIcon, 
  PieChartIcon, 
  Calendar, 
  Download,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw
} from 'lucide-react';
import { useAuth } from '../../../../../../firebase/AuthContext';
import api from '../../../../../../lib/api';
import { Button } from "../../../../../../components/ui/button.jsx";

export const Analytics = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dateRange, setDateRange] = useState('week'); // week, month, year
  const [data, setData] = useState({
    fillLevelTrends: [],
    collectionStats: {},
    efficiencyMetrics: {},
    binComparison: []
  });
  
  // Fetch analytics data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // In a real implementation, you would call actual API endpoints
        // const fillLevelTrends = await api.analytics.getFillLevelTrends(dateRange);
        // const collectionStats = await api.analytics.getCollectionStats(dateRange);
        // const efficiencyMetrics = await api.analytics.getEfficiencyMetrics(dateRange);
        // const binComparison = await api.analytics.getBinComparison(dateRange);
        
        // For now, use mock data
        const mockData = generateMockData(dateRange);
        setData(mockData);
      } catch (err) {
        console.error('Failed to fetch analytics data:', err);
        setError('Could not load analytics data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [dateRange]);
  
  // Generate mock data for development/demo
  const generateMockData = (range) => {
    // Generate different data based on selected date range
    const daysToGenerate = range === 'week' ? 7 : range === 'month' ? 30 : 365;
    const dataPoints = range === 'week' ? 7 : range === 'month' ? 10 : 12;
    
    // Generate fill level trends
    const fillLevelTrends = [];
    for (let i = 0; i < dataPoints; i++) {
      const date = new Date();
      date.setDate(date.getDate() - Math.floor((daysToGenerate / dataPoints) * i));
      
      fillLevelTrends.push({
        date: date.toISOString().split('T')[0],
        average: Math.floor(Math.random() * 40) + 30, // 30-70%
        critical: Math.floor(Math.random() * 5) + 1,   // 1-6 bins
        total: 15
      });
    }
    
    // Collection statistics
    const collections = Math.floor(Math.random() * 10) + 20; // 20-30
    const previousCollections = Math.floor(Math.random() * 10) + 15; // 15-25
    const changePercent = Math.round(((collections - previousCollections) / previousCollections) * 100);
    
    const collectionStats = {
      collections,
      previousCollections,
      changePercent,
      averageFillLevel: Math.floor(Math.random() * 20) + 70, // 70-90%
      wasteCollected: Math.floor(Math.random() * 500) + 1000, // 1000-1500kg
      timeSaved: Math.floor(Math.random() * 5) + 8 // 8-13 hours
    };
    
    // Efficiency metrics
    const efficiencyMetrics = {
      routeEfficiency: Math.floor(Math.random() * 20) + 70, // 70-90%
      fuelSaved: Math.floor(Math.random() * 50) + 100, // 100-150 liters
      co2Reduced: Math.floor(Math.random() * 100) + 200, // 200-300kg
      costSavings: Math.floor(Math.random() * 500) + 1000 // $1000-1500
    };
    
    // Bin comparison
    const binComparison = [];
    const binNames = ['Main Street', 'Park Avenue', 'City Center', 'Garden Street', 'Station Road'];
    
    for (let i = 0; i < 5; i++) {
      binComparison.push({
        name: binNames[i],
        fillRate: Math.floor(Math.random() * 10) + 5, // 5-15% per day
        collections: Math.floor(Math.random() * 5) + 1, // 1-6
        efficiency: Math.floor(Math.random() * 20) + 70 // 70-90%
      });
    }
    
    return {
      fillLevelTrends: fillLevelTrends.reverse(), // Most recent last
      collectionStats,
      efficiencyMetrics,
      binComparison
    };
  };
  
  // Draw a simple bar chart
  const renderBarChart = (data) => {
    const maxValue = Math.max(...data.map(d => d.average));
    
    return (
      <div className="relative h-56">
        <div className="absolute inset-0 flex items-end justify-between gap-1 pb-6">
          {data.map((point, i) => (
            <div key={i} className="flex flex-col items-center flex-1">
              <div 
                className="w-full bg-primary rounded-t-sm transition-all duration-500 ease-in-out"
                style={{ height: `${(point.average / 100) * 200}px` }}
              ></div>
            </div>
          ))}
        </div>
        <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500 pt-1 border-t border-gray-200">
          {data.map((point, i) => (
            <div key={i} className="text-center">
              {range === 'week' ? point.date.split('-')[2] : 
               range === 'month' ? `${point.date.split('-')[1]}-${point.date.split('-')[2]}` :
               ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i]}
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  // Format numbers with comma separation
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  // Set date range
  const handleDateRangeChange = (range) => {
    setDateRange(range);
  };

  return (
    <div className="py-8 px-4 md:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 md:mb-0">
          Analytics Dashboard
        </h1>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => navigate('/dashboard')}
            className="text-gray-700"
          >
            View Dashboard
          </Button>
          <Button
            variant="outline"
            className="text-gray-700 flex items-center gap-1"
          >
            <Download size={16} />
            <span>Export</span>
          </Button>
        </div>
      </div>
      
      {/* Date range selector */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">
            Time Period
          </h2>
          <div className="flex bg-gray-100 rounded-md p-1">
            <button 
              className={`px-3 py-1 text-sm rounded-md transition-colors ${dateRange === 'week' ? 'bg-white shadow-sm' : 'text-gray-600 hover:bg-gray-200'}`}
              onClick={() => handleDateRangeChange('week')}
            >
              Week
            </button>
            <button 
              className={`px-3 py-1 text-sm rounded-md transition-colors ${dateRange === 'month' ? 'bg-white shadow-sm' : 'text-gray-600 hover:bg-gray-200'}`}
              onClick={() => handleDateRangeChange('month')}
            >
              Month
            </button>
            <button 
              className={`px-3 py-1 text-sm rounded-md transition-colors ${dateRange === 'year' ? 'bg-white shadow-sm' : 'text-gray-600 hover:bg-gray-200'}`}
              onClick={() => handleDateRangeChange('year')}
            >
              Year
            </button>
          </div>
        </div>
      </div>
      
      {loading ? (
        <div className="p-12 flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : error ? (
        <div className="p-6 bg-red-50 rounded-lg border border-red-200 text-red-700">
          {error}
        </div>
      ) : (
        <>
          {/* Collection stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-gray-500">Collections</p>
                  <h3 className="text-2xl font-bold mt-1">{data.collectionStats.collections}</h3>
                </div>
                <div className={`flex items-center px-2 py-1 rounded text-sm ${data.collectionStats.changePercent >= 0 ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                  {data.collectionStats.changePercent >= 0 ? (
                    <ArrowUpRight size={14} className="mr-1" />
                  ) : (
                    <ArrowDownRight size={14} className="mr-1" />
                  )}
                  {Math.abs(data.collectionStats.changePercent)}%
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">Compared to previous {dateRange}</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <p className="text-sm text-gray-500">Avg. Fill Level at Collection</p>
              <h3 className="text-2xl font-bold mt-1">{data.collectionStats.averageFillLevel}%</h3>
              <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
                <div 
                  className={`h-full rounded-full ${data.collectionStats.averageFillLevel >= 80 ? 'bg-green-500' : 'bg-amber-500'}`}
                  style={{ width: `${data.collectionStats.averageFillLevel}%` }}
                ></div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <p className="text-sm text-gray-500">Waste Collected</p>
              <h3 className="text-2xl font-bold mt-1">{formatNumber(data.collectionStats.wasteCollected)} kg</h3>
              <p className="text-xs text-gray-500 mt-2">Total waste volume this {dateRange}</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <p className="text-sm text-gray-500">Time Saved</p>
              <h3 className="text-2xl font-bold mt-1">{data.collectionStats.timeSaved} hours</h3>
              <p className="text-xs text-gray-500 mt-2">Optimized collection routes</p>
            </div>
          </div>
          
          {/* Fill level trends */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <BarChart3Icon size={18} className="text-primary" />
                  Fill Level Trends
                </h2>
                <div className="text-sm text-gray-500 flex items-center gap-1">
                  <RefreshCw size={14} />
                  Updated 2h ago
                </div>
              </div>
              
              {renderBarChart(data.fillLevelTrends)}
              
              <div className="grid grid-cols-3 mt-4 pt-4 border-t border-gray-100">
                <div className="text-center">
                  <p className="text-xs text-gray-500">Average Fill Level</p>
                  <p className="text-xl font-semibold mt-1">{data.fillLevelTrends[data.fillLevelTrends.length - 1].average}%</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500">Critical Bins</p>
                  <p className="text-xl font-semibold mt-1">{data.fillLevelTrends[data.fillLevelTrends.length - 1].critical}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500">Total Bins</p>
                  <p className="text-xl font-semibold mt-1">{data.fillLevelTrends[data.fillLevelTrends.length - 1].total}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-6">
                <LineChartIcon size={18} className="text-primary" />
                Efficiency Metrics
              </h2>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <p className="text-sm text-gray-600">Route Efficiency</p>
                    <p className="text-sm font-medium">{data.efficiencyMetrics.routeEfficiency}%</p>
                  </div>
                  <div className="w-full bg-gray-200 h-2 rounded-full">
                    <div 
                      className="h-full bg-green-500 rounded-full"
                      style={{ width: `${data.efficiencyMetrics.routeEfficiency}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="pt-3">
                  <p className="font-medium text-gray-800 mb-3">Environmental Impact</p>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <p className="text-sm text-gray-600">Fuel Saved</p>
                      <p className="text-sm font-medium">{data.efficiencyMetrics.fuelSaved} L</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-sm text-gray-600">CO₂ Reduction</p>
                      <p className="text-sm font-medium">{data.efficiencyMetrics.co2Reduced} kg</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-sm text-gray-600">Cost Savings</p>
                      <p className="text-sm font-medium">${formatNumber(data.efficiencyMetrics.costSavings)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bin comparison */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-6">
              <PieChartIcon size={18} className="text-primary" />
              Bin Performance Comparison
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Bin Location</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Fill Rate</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Collections</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Efficiency</th>
                  </tr>
                </thead>
                <tbody>
                  {data.binComparison.map((bin, index) => (
                    <tr key={index} className={index < data.binComparison.length - 1 ? 'border-b border-gray-100' : ''}>
                      <td className="py-3 px-4">
                        <div className="font-medium text-gray-800">{bin.name}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-sm">{bin.fillRate}% per day</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-sm">{bin.collections} this {dateRange}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <div className="w-full max-w-[100px] bg-gray-200 h-2 rounded-full mr-2">
                            <div 
                              className={`h-full rounded-full ${bin.efficiency >= 80 ? 'bg-green-500' : bin.efficiency >= 60 ? 'bg-amber-500' : 'bg-red-500'}`}
                              style={{ width: `${bin.efficiency}%` }}
                            ></div>
                          </div>
                          <span className="text-sm">{bin.efficiency}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Analytics; 