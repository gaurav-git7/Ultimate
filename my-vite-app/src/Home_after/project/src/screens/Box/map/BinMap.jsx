import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MapPinIcon, 
  Trash2Icon, 
  AlertTriangleIcon, 
  CheckCircleIcon
} from 'lucide-react';
import { useAuth } from '../../../../../../firebase/AuthContext';
import api from '../../../../../../lib/api';
import { Button } from "../../../../../../components/ui/button.jsx";

export const BinMap = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [bins, setBins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBin, setSelectedBin] = useState(null);
  
  // Fetch all bins data
  useEffect(() => {
    const fetchBins = async () => {
      setLoading(true);
      try {
        const binsData = await api.bins.getAllBins();
        setBins(binsData || []);
      } catch (err) {
        console.error('Failed to fetch bins:', err);
        setError('Could not load bins data. Please try again later.');
        
        // Mock data for development
        if (process.env.NODE_ENV === 'development') {
          setBins(generateMockBinsData());
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchBins();
  }, []);
  
  // Generate mock data for development/demo
  const generateMockBinsData = () => {
    return [
      {
        binId: '1328',
        name: 'Main Street Bin',
        location: 'Main Street',
        lastReading: {
          fillPercentage: 85,
          distance: 10,
          status: 'critical',
          timestamp: new Date().toISOString()
        },
        coordinates: { lat: 40.712776, lng: -74.005974 }
      },
      {
        binId: '2045',
        name: 'Park Avenue Bin',
        location: 'Park Avenue',
        lastReading: {
          fillPercentage: 60,
          distance: 15,
          status: 'warning',
          timestamp: new Date(Date.now() - 3600000).toISOString()
        },
        coordinates: { lat: 40.7128, lng: -73.9950 }
      },
      {
        binId: '3782',
        name: 'City Center Bin',
        location: 'City Center',
        lastReading: {
          fillPercentage: 30,
          distance: 28,
          status: 'normal',
          timestamp: new Date(Date.now() - 7200000).toISOString()
        },
        coordinates: { lat: 40.7200, lng: -74.0000 }
      },
      {
        binId: '4299',
        name: 'Garden Street Bin',
        location: 'Garden Street',
        lastReading: {
          fillPercentage: 10,
          distance: 36,
          status: 'normal',
          timestamp: new Date(Date.now() - 10800000).toISOString()
        },
        coordinates: { lat: 40.7150, lng: -73.9900 }
      }
    ];
  };
  
  // Format timestamp to relative time
  const formatTimeAgo = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
    return `${Math.floor(diffMins / 1440)}d ago`;
  };
  
  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'critical': return 'text-red-500';
      case 'warning': return 'text-amber-500';
      case 'normal': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };
  
  // Get status background color
  const getStatusBgColor = (status) => {
    switch (status) {
      case 'critical': return 'bg-red-500';
      case 'warning': return 'bg-amber-500';
      case 'normal': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };
  
  // View bin details
  const viewBinDetails = (binId) => {
    navigate('/dashboard', { state: { binId } });
  };

  return (
    <div className="py-8 px-4 md:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Smart Bins Map</h1>
        <Button
          onClick={() => navigate('/dashboard')}
          className="bg-primary text-white"
        >
          View Dashboard
        </Button>
      </div>
      
      {loading ? (
        <div className="p-12 flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : error ? (
        <div className="p-6 bg-red-50 rounded-lg border border-red-200 text-red-700 flex items-center gap-2">
          <AlertTriangleIcon size={20} />
          <p>{error}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map visualization (simplified for demo) */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm border border-gray-200 h-[600px] relative">
            <h2 className="text-xl font-semibold mb-6 text-gray-800">Bin Locations</h2>
            
            {/* Simplified map visualization */}
            <div className="w-full h-[500px] bg-gray-100 border border-gray-300 rounded-lg relative overflow-hidden">
              {/* Mock map container */}
              <div className="absolute inset-0 p-4">
                {/* For a real implementation, you would use a proper map library like Google Maps, Leaflet, etc. */}
                <p className="text-center text-gray-500 bg-white p-2 rounded mb-2 text-sm">
                  In a production environment, this would be an interactive map using Google Maps, Mapbox, or Leaflet
                </p>
                
                {/* Bins representation */}
                {bins.map(bin => (
                  <div 
                    key={bin.binId}
                    className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 hover:z-20"
                    style={{ 
                      top: `${100 - (bin.coordinates.lat - 40.7100) * 500}px`, 
                      left: `${(bin.coordinates.lng + 74.01) * 500}px` 
                    }}
                    onClick={() => setSelectedBin(bin)}
                  >
                    <div className={`w-5 h-5 rounded-full ${getStatusBgColor(bin.lastReading.status)} flex items-center justify-center text-white shadow-lg transform transition-transform hover:scale-150`}>
                      <Trash2Icon size={12} />
                    </div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 top-6 text-xs font-medium bg-white shadow-md px-2 py-1 rounded whitespace-nowrap">
                      {bin.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Selected bin info overlay */}
            {selectedBin && (
              <div className="absolute bottom-8 right-8 w-64 bg-white rounded-lg shadow-lg border border-gray-200 p-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold">{selectedBin.name}</h3>
                  <button 
                    className="text-gray-400 hover:text-gray-600"
                    onClick={() => setSelectedBin(null)}
                  >
                    &times;
                  </button>
                </div>
                <p className="text-gray-600 text-sm">{selectedBin.location}</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className={`w-3 h-3 rounded-full ${getStatusBgColor(selectedBin.lastReading.status)}`}></div>
                  <span className={`text-sm ${getStatusColor(selectedBin.lastReading.status)}`}>
                    {selectedBin.lastReading.status.charAt(0).toUpperCase() + selectedBin.lastReading.status.slice(1)}
                  </span>
                  <span className="text-gray-500 text-xs ml-auto">
                    {formatTimeAgo(selectedBin.lastReading.timestamp)}
                  </span>
                </div>
                <div className="mt-2 bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div 
                    className={getStatusBgColor(selectedBin.lastReading.status)}
                    style={{ width: `${selectedBin.lastReading.fillPercentage}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Fill level: {selectedBin.lastReading.fillPercentage}%</span>
                </div>
                <Button
                  className="mt-4 w-full"
                  onClick={() => viewBinDetails(selectedBin.binId)}
                >
                  View Details
                </Button>
              </div>
            )}
          </div>
          
          {/* Bins List */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-6 text-gray-800">Bins Overview</h2>
            
            <div className="space-y-4 max-h-[500px] overflow-auto pr-2">
              {bins.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No bins available</p>
              ) : (
                bins.map(bin => (
                  <div 
                    key={bin.binId}
                    className={`p-4 rounded-lg border ${selectedBin?.binId === bin.binId ? 'border-primary bg-primary-50' : 'border-gray-200 hover:border-primary-100 hover:bg-gray-50'} cursor-pointer transition-colors`}
                    onClick={() => setSelectedBin(bin)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-800">{bin.name}</h3>
                        <p className="text-gray-600 text-sm flex items-center gap-1">
                          <MapPinIcon size={14} />
                          {bin.location}
                        </p>
                      </div>
                      <div className={`w-4 h-4 rounded-full ${getStatusBgColor(bin.lastReading.status)}`}></div>
                    </div>
                    
                    <div className="mt-3 flex items-center justify-between">
                      <div>
                        <div className="flex items-center text-sm">
                          <span className="font-medium">{bin.lastReading.fillPercentage}%</span>
                          <span className="text-gray-500 text-xs ml-2">
                            {formatTimeAgo(bin.lastReading.timestamp)}
                          </span>
                        </div>
                        <div className="mt-1 bg-gray-200 h-1.5 w-24 rounded-full overflow-hidden">
                          <div 
                            className={getStatusBgColor(bin.lastReading.status)}
                            style={{ width: `${bin.lastReading.fillPercentage}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <button
                        className="text-primary hover:text-primary-dark text-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          viewBinDetails(bin.binId);
                        }}
                      >
                        Details
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-200">
              <h3 className="font-medium text-gray-800 mb-2">Status Summary</h3>
              <div className="grid grid-cols-3 gap-2">
                <div className="p-2 bg-red-50 rounded border border-red-100 text-center">
                  <div className="font-bold text-red-700">
                    {bins.filter(bin => bin.lastReading.status === 'critical').length}
                  </div>
                  <div className="text-xs text-red-600">Critical</div>
                </div>
                <div className="p-2 bg-amber-50 rounded border border-amber-100 text-center">
                  <div className="font-bold text-amber-700">
                    {bins.filter(bin => bin.lastReading.status === 'warning').length}
                  </div>
                  <div className="text-xs text-amber-600">Warning</div>
                </div>
                <div className="p-2 bg-green-50 rounded border border-green-100 text-center">
                  <div className="font-bold text-green-700">
                    {bins.filter(bin => bin.lastReading.status === 'normal').length}
                  </div>
                  <div className="text-xs text-green-600">Normal</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BinMap; 