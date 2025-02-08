import * as React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleAuthCallback } from '../services/platformAuth';
import { toast } from '../components/ui/use-toast';

export function AuthCallback() {
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
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Completing Connection...
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Please wait while we finish setting up your account.
          </p>
        </div>
      </div>
    );
  }

  return null;
}
