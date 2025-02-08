import * as React from 'react';
import { Button } from "@/components/ui/button";
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
    <div className="flex items-center justify-between p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900">
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
        </div>
      </div>
      <Button
        variant={isConnected ? "outline" : "default"}
        onClick={isConnected ? handleDisconnect : handleConnect}
        disabled={isConnecting}
      >
        {isConnecting ? (
          "Connecting..."
        ) : isConnected ? (
          "Disconnect"
        ) : (
          "Connect"
        )}
      </Button>
    </div>
  );
}
