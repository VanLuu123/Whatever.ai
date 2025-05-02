const getBackendUrl = () => {
    // Use environment variable in production, fallback to localhost in development
    return process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';
  };
  
export const config = {
    backendUrl: getBackendUrl()
};