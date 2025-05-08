const getBackendUrl = () => {
    // Use environment variable in production, fallback to localhost in development
    return process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';
  };

const getClerkFrontendKey = () => {
    if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
        throw new Error('Missing NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY');
    }
    return process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
};
  
export const config = {
    backendUrl: getBackendUrl(),
    clerkKey: getClerkFrontendKey(),
};