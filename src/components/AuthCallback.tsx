import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleAuthCallback } from '../services/platformAuth';
import { toast } from '../components/ui/use-toast';

export const AuthCallback: FC = () => {
  const [isProcessing, setIsProcessing] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const processAuth = async () => {
      try {
        // Get platform from URL path
        const pathSegments = window.location.pathname.split('/');
        const platform = pathSegments[pathSegments.length - 1];

        // Get code and state from URL params
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');
        const state = params.get('state');

        if (!code || !state) {
          throw new Error('Missing required parameters');
        }

        // Handle the callback
        const success = await handleAuthCallback(platform, code, state);

        if (success) {
          toast({
            title: 'Connection Successful',
            description: `Successfully connected to ${platform}`,
          });
          // Redirect to connections page
          navigate('/connections');
        } else {
          throw new Error('Failed to complete authentication');
        }
      } catch (error) {
        console.error('Auth callback error:', error);
        toast({
          title: 'Connection Failed',
          description: 'Failed to complete platform connection. Please try again.',
          variant: 'destructive',
        });
        // Redirect to connections page on error
        navigate('/connections');
      } finally {
        setIsProcessing(false);
      }
    };

    processAuth();
  }, [navigate]);

  if (isProcessing) {
    return (
      <div className="ud-flex ud-items-center ud-justify-center ud-min-h-screen ud-bg-white dark:ud-bg-dark">
        <div className="ud-text-center ud-p-8 ud-rounded-xl ud-bg-white dark:ud-bg-dark ud-shadow-lg">
          <div className="ud-mb-6">
            <svg
              className="ud-w-16 ud-h-16 ud-mx-auto ud-text-primary ud-animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="ud-opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="ud-opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </div>
          <h2 className="ud-text-2xl ud-font-bold ud-text-black dark:ud-text-white ud-mb-4">
            Completing Connection...
          </h2>
          <p className="ud-text-body-color">
            Please wait while we finish setting up your account.
          </p>
        </div>
      </div>
    );
  }

  return null;
}
