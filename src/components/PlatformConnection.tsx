import * as React from 'react';
import { toast } from "@/components/ui/use-toast";
import { initiatePlatformAuth } from "@/services/platformAuth";
import { getToken } from "@/utils/tokenStorage";

// Add proper React imports
const { useState } = React;

interface PlatformConnectionProps {
  platform: string;
  icon: React.ReactNode;
  name: string;
  description: string;
}

export function PlatformConnection({ platform, icon, name, description }: PlatformConnectionProps) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(() => !!getToken(platform));

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      const connection = await initiatePlatformAuth(platform);
      if (connection) {
        setIsConnected(true);
        toast({
          title: "Connected Successfully",
          description: `Successfully connected to ${name}`,
        });
      }
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: error instanceof Error ? error.message : `Failed to connect to ${name}`,
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = async () => {
    try {
      // Remove token from storage
      localStorage.removeItem(`spreadify_${platform}_token`);
      setIsConnected(false);
      toast({
        title: "Disconnected",
        description: `Successfully disconnected from ${name}`,
      });
    } catch (error) {
      toast({
        title: "Disconnection Failed",
        description: `Failed to disconnect from ${name}`,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="ud-bg-white dark:ud-bg-dark ud-p-6 ud-rounded-xl ud-shadow-lg ud-transition-all hover:ud-shadow-features-hover">
      <div className="ud-flex ud-items-center ud-justify-between">
        <div className="ud-flex ud-items-center ud-space-x-4">
          <div className="ud-flex ud-items-center ud-justify-center ud-w-[50px] ud-h-[50px] ud-rounded-lg ud-bg-primary ud-bg-opacity-5 ud-text-primary">
            {icon}
          </div>
          <div>
            <h3 className="ud-text-xl ud-font-bold ud-text-black dark:ud-text-white">
              {name}
            </h3>
            <p className="ud-text-sm ud-text-body-color">
              {description}
            </p>
          </div>
        </div>
        <button
          onClick={isConnected ? handleDisconnect : handleConnect}
          disabled={isConnecting}
          className={`ud-px-4 ud-py-2 ud-rounded-lg ud-font-medium ud-transition-colors ${
            isConnecting
              ? 'ud-opacity-50 ud-cursor-not-allowed'
              : isConnected
              ? 'ud-bg-red-100 ud-text-red-600 hover:ud-bg-red-200 dark:ud-bg-red-900/30 dark:ud-text-red-400'
              : 'ud-bg-primary ud-text-white hover:ud-bg-primary-hover'
          }`}
        >
          {isConnecting ? (
            "Connecting..."
          ) : isConnected ? (
            "Disconnect"
          ) : (
            "Connect"
          )}
        </button>
      </div>
    </div>
  );
}
