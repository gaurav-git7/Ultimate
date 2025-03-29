import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, 
  Download, 
  Calendar, 
  Filter, 
  Printer,
  Share2,
  ChevronDown,
  Search,
  ArrowDownToDot
} from 'lucide-react';
import { useAuth } from '../../../../../../firebase/AuthContext';
import api from '../../../../../../lib/api';
import { Button } from "../../../../../../components/ui/button.jsx";
import { Input } from "../../../../../../components/ui/input.jsx";

export const Reports = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reports, setReports] = useState([]);
  const [reportType, setReportType] = useState('all');
  const [dateRange, setDateRange] = useState('month');
  const [searchTerm, setSearchTerm] = useState('');
  const [exportFormat, setExportFormat] = useState('pdf');
  const [showExportOptions, setShowExportOptions] = useState(false);
  const [generatingReport, setGeneratingReport] = useState(false);
  
  // Fetch reports data
  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      try {
        // In a real implementation, you would call actual API endpoints
        // const reportsData = await api.reports.getReports({ type: reportType, dateRange, search: searchTerm });
        
        // For now, use mock data
        const mockData = generateMockReports();
        
        // Apply filters to mock data
        let filteredReports = [...mockData];
        
        if (reportType !== 'all') {
          filteredReports = filteredReports.filter(report => report.type === reportType);
        }
        
        if (searchTerm) {
          const term = searchTerm.toLowerCase();
          filteredReports = filteredReports.filter(report => 
            report.title.toLowerCase().includes(term) || 
            report.description.toLowerCase().includes(term) ||
            report.location.toLowerCase().includes(term)
          );
        }
        
        // Sort by date (newest first)
        filteredReports.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        setReports(filteredReports);
      } catch (err) {
        console.error('Failed to fetch reports:', err);
        setError('Could not load reports. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchReports();
  }, [reportType, dateRange, searchTerm]);
  
  // Generate mock reports data
  const generateMockReports = () => {
    const types = ['collection', 'efficiency', 'environmental', 'maintenance'];
    const locations = ['Main Street', 'Park Avenue', 'City Center', 'Garden Street', 'Station Road'];
    const reportData = [];
    
    // Generate 20 random reports
    for (let i = 0; i < 20; i++) {
      const type = types[Math.floor(Math.random() * types.length)];
      const location = locations[Math.floor(Math.random() * locations.length)];
      const daysAgo = Math.floor(Math.random() * 60); // Random date within last 60 days
      
      const date = new Date();
      date.setDate(date.getDate() - daysAgo);
      
      let title, description;
      switch (type) {
        case 'collection':
          title = `Collection Report - ${location}`;
          description = `Waste collection summary for bins at ${location}.`;
          break;
        case 'efficiency':
          title = `Efficiency Analysis - ${location}`;
          description = `Route optimization and collection efficiency for ${location}.`;
          break;
        case 'environmental':
          title = `Environmental Impact - ${location}`;
          description = `CO2 reduction and environmental metrics for ${location}.`;
          break;
        case 'maintenance':
          title = `Maintenance Log - ${location}`;
          description = `Maintenance activities and sensor health for bins at ${location}.`;
          break;
        default:
          title = `General Report - ${location}`;
          description = `General waste management report for ${location}.`;
      }
      
      reportData.push({
        id: `report-${i + 1}`,
        title,
        description,
        type,
        date: date.toISOString(),
        location,
        size: `${Math.floor(Math.random() * 900) + 100}KB`,
        author: 'System',
        pages: Math.floor(Math.random() * 15) + 2 // 2-16 pages
      });
    }
    
    return reportData;
  };
  
  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  // Get report type icon
  const getReportTypeIcon = (type) => {
    switch (type) {
      case 'collection':
        return <ArrowDownToDot className="text-blue-500" size={16} />;
      case 'efficiency':
        return <FileText className="text-green-500" size={16} />;
      case 'environmental':
        return <FileText className="text-teal-500" size={16} />;
      case 'maintenance':
        return <FileText className="text-amber-500" size={16} />;
      default:
        return <FileText className="text-gray-500" size={16} />;
    }
  };
  
  // Generate a new report
  const generateReport = async () => {
    setGeneratingReport(true);
    
    try {
      // In a real implementation, you would call an API to generate a report
      // await api.reports.generateReport({ type: reportType, dateRange });
      
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Add mock report to the list
      const newReport = {
        id: `report-new-${Date.now()}`,
        title: `New ${reportType !== 'all' ? reportType.charAt(0).toUpperCase() + reportType.slice(1) : 'Comprehensive'} Report`,
        description: `Automatically generated report for all bins.`,
        type: reportType !== 'all' ? reportType : 'collection',
        date: new Date().toISOString(),
        location: 'All Locations',
        size: `${Math.floor(Math.random() * 900) + 100}KB`,
        author: currentUser?.displayName || currentUser?.email || 'User',
        pages: Math.floor(Math.random() * 15) + 5 // 5-20 pages
      };
      
      setReports([newReport, ...reports]);
      
      // Show success message or notification here
      alert('Report generated successfully!');
    } catch (err) {
      console.error('Failed to generate report:', err);
      alert('Failed to generate report. Please try again.');
    } finally {
      setGeneratingReport(false);
    }
  };
  
  // Handle file download
  const handleDownload = (report) => {
    // In a real implementation, you would call an API to download the report
    // window.location.href = api.reports.getDownloadLink(report.id, exportFormat);
    
    alert(`Downloading "${report.title}" in ${exportFormat.toUpperCase()} format. This would be a real download in production.`);
  };
  
  return (
    <div className="py-8 px-4 md:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 md:mb-0">
          Reports
        </h1>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => navigate('/dashboard')}
            variant="outline"
            className="text-gray-700"
          >
            View Dashboard
          </Button>
          <div className="relative">
            <Button
              onClick={() => setShowExportOptions(!showExportOptions)}
              className="bg-primary text-white flex items-center gap-1"
            >
              <FileText size={16} />
              <span>Generate Report</span>
              <ChevronDown size={14} className="ml-1" />
            </Button>
            
            {showExportOptions && (
              <div className="absolute right-0 top-full mt-1 w-64 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                <div className="p-3">
                  <h3 className="font-medium text-gray-800 mb-2">Report Options</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Report Type</label>
                      <select
                        value={reportType}
                        onChange={(e) => setReportType(e.target.value)}
                        className="w-full p-2 text-sm border border-gray-300 rounded-md"
                      >
                        <option value="all">All Data</option>
                        <option value="collection">Collection</option>
                        <option value="efficiency">Efficiency</option>
                        <option value="environmental">Environmental</option>
                        <option value="maintenance">Maintenance</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Time Period</label>
                      <select
                        value={dateRange}
                        onChange={(e) => setDateRange(e.target.value)}
                        className="w-full p-2 text-sm border border-gray-300 rounded-md"
                      >
                        <option value="week">Past Week</option>
                        <option value="month">Past Month</option>
                        <option value="quarter">Past Quarter</option>
                        <option value="year">Past Year</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Format</label>
                      <select
                        value={exportFormat}
                        onChange={(e) => setExportFormat(e.target.value)}
                        className="w-full p-2 text-sm border border-gray-300 rounded-md"
                      >
                        <option value="pdf">PDF</option>
                        <option value="excel">Excel</option>
                        <option value="csv">CSV</option>
                      </select>
                    </div>
                    <Button
                      onClick={() => {
                        setShowExportOptions(false);
                        generateReport();
                      }}
                      className="w-full"
                      disabled={generatingReport}
                    >
                      {generatingReport ? 'Generating...' : 'Generate'}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Filters and search */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-gray-700 flex items-center">
              <Filter size={16} className="mr-1" />
              Filter:
            </span>
            <div className="flex bg-gray-100 rounded-md p-1">
              <button 
                className={`px-3 py-1 text-sm rounded-md transition-colors ${reportType === 'all' ? 'bg-white shadow-sm' : 'text-gray-600 hover:bg-gray-200'}`}
                onClick={() => setReportType('all')}
              >
                All
              </button>
              <button 
                className={`px-3 py-1 text-sm rounded-md transition-colors ${reportType === 'collection' ? 'bg-white shadow-sm' : 'text-gray-600 hover:bg-gray-200'}`}
                onClick={() => setReportType('collection')}
              >
                Collection
              </button>
              <button 
                className={`px-3 py-1 text-sm rounded-md transition-colors ${reportType === 'efficiency' ? 'bg-white shadow-sm' : 'text-gray-600 hover:bg-gray-200'}`}
                onClick={() => setReportType('efficiency')}
              >
                Efficiency
              </button>
              <button 
                className={`px-3 py-1 text-sm rounded-md transition-colors ${reportType === 'environmental' ? 'bg-white shadow-sm' : 'text-gray-600 hover:bg-gray-200'}`}
                onClick={() => setReportType('environmental')}
              >
                Environmental
              </button>
              <button 
                className={`px-3 py-1 text-sm rounded-md transition-colors ${reportType === 'maintenance' ? 'bg-white shadow-sm' : 'text-gray-600 hover:bg-gray-200'}`}
                onClick={() => setReportType('maintenance')}
              >
                Maintenance
              </button>
            </div>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <Input
              className="pl-9 w-full sm:w-64"
              placeholder="Search reports..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>
      
      {/* Reports list */}
      {loading ? (
        <div className="p-12 flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : error ? (
        <div className="p-6 bg-red-50 rounded-lg border border-red-200 text-red-700">
          {error}
        </div>
      ) : reports.length === 0 ? (
        <div className="p-12 bg-white rounded-lg shadow-sm border border-gray-200 text-center text-gray-500">
          <FileText size={48} className="mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium text-gray-700 mb-1">No reports found</h3>
          <p className="text-sm">Try changing your filters or generate a new report.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-left">
                <th className="py-3 px-4 font-medium text-gray-700">Report</th>
                <th className="py-3 px-4 font-medium text-gray-700 hidden md:table-cell">Date</th>
                <th className="py-3 px-4 font-medium text-gray-700 hidden lg:table-cell">Location</th>
                <th className="py-3 px-4 font-medium text-gray-700 hidden lg:table-cell">Size</th>
                <th className="py-3 px-4 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report, index) => (
                <tr key={report.id} className={index < reports.length - 1 ? 'border-b border-gray-100' : ''}>
                  <td className="py-3 px-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-3">
                        {getReportTypeIcon(report.type)}
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">{report.title}</div>
                        <div className="text-sm text-gray-500">{report.description}</div>
                        <div className="text-xs text-gray-400 md:hidden mt-1">{formatDate(report.date)}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600 hidden md:table-cell">
                    {formatDate(report.date)}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600 hidden lg:table-cell">
                    {report.location}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600 hidden lg:table-cell">
                    {report.size}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <button 
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md"
                        onClick={() => handleDownload(report)}
                        title="Download"
                      >
                        <Download size={16} />
                      </button>
                      <button 
                        className="p-1.5 text-gray-600 hover:bg-gray-50 rounded-md"
                        title="Print"
                      >
                        <Printer size={16} />
                      </button>
                      <button 
                        className="p-1.5 text-gray-600 hover:bg-gray-50 rounded-md"
                        title="Share"
                      >
                        <Share2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {/* Instructions panel */}
      {!loading && !error && reports.length > 0 && (
        <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-100 text-sm">
          <h3 className="font-medium text-blue-800 mb-2">About Reports</h3>
          <p className="text-blue-700 mb-2">
            Reports provide detailed insights into your waste management operations. 
            They help optimize collection routes, track environmental impact, and monitor bin maintenance.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-3">
            <div className="flex items-start gap-2">
              <div className="mt-0.5">
                <div className="w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center">
                  <ArrowDownToDot className="text-blue-500" size={10} />
                </div>
              </div>
              <div>
                <p className="font-medium text-blue-800">Collection</p>
                <p className="text-blue-700 text-xs">Waste collection data and scheduling</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="mt-0.5">
                <div className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center">
                  <FileText className="text-green-500" size={10} />
                </div>
              </div>
              <div>
                <p className="font-medium text-blue-800">Efficiency</p>
                <p className="text-blue-700 text-xs">Route optimization and time savings</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="mt-0.5">
                <div className="w-4 h-4 rounded-full bg-teal-100 flex items-center justify-center">
                  <FileText className="text-teal-500" size={10} />
                </div>
              </div>
              <div>
                <p className="font-medium text-blue-800">Environmental</p>
                <p className="text-blue-700 text-xs">CO₂ reduction and sustainability metrics</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="mt-0.5">
                <div className="w-4 h-4 rounded-full bg-amber-100 flex items-center justify-center">
                  <FileText className="text-amber-500" size={10} />
                </div>
              </div>
              <div>
                <p className="font-medium text-blue-800">Maintenance</p>
                <p className="text-blue-700 text-xs">Bin health and maintenance logs</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports; 