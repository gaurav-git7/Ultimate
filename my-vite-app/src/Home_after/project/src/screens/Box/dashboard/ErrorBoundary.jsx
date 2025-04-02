import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null 
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to console
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({ errorInfo });
    
    // You can also log the error to an error reporting service here
  }

  resetError = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  }

  render() {
    if (this.state.hasError) {
      // Render fallback UI
      return (
        <div className="p-6 rounded-lg shadow-lg bg-white">
          <h2 className="text-xl font-bold text-red-600 mb-3">Something went wrong</h2>
          <p className="mb-4 text-gray-700">We encountered an unexpected error while rendering this component.</p>
          
          <div className="bg-gray-100 p-4 rounded-lg mb-4 overflow-auto max-h-80">
            <p className="text-red-600 font-mono text-sm mb-2">{this.state.error && this.state.error.toString()}</p>
            {this.state.errorInfo && (
              <pre className="text-xs text-gray-800 font-mono whitespace-pre-wrap">
                {this.state.errorInfo.componentStack}
              </pre>
            )}
          </div>
          
          <div className="flex gap-4">
            <button 
              onClick={this.resetError} 
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
            
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    // When there's no error, render children normally
    return this.props.children;
  }
}

export default ErrorBoundary; 