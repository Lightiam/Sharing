import { toast } from "../components/ui/use-toast"

export interface PlatformConfig {
  clientId: string;
  authUrl: string;
  scope: string[];
  redirectUri: string;
}

export interface PlatformConnection {
  platform: string;
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

declare global {
  interface ImportMetaEnv {
    VITE_FACEBOOK_CLIENT_ID: string;
    VITE_TWITTER_CLIENT_ID: string;
    VITE_INSTAGRAM_CLIENT_ID: string;
    VITE_TIKTOK_CLIENT_ID: string;
    VITE_YOUTUBE_CLIENT_ID: string;
  }
}

const platformConfigs: Record<string, PlatformConfig> = {
  facebook: {
    clientId: import.meta.env.VITE_FACEBOOK_CLIENT_ID,
    authUrl: 'https://www.facebook.com/v18.0/dialog/oauth',
    scope: ['pages_manage_posts', 'pages_read_engagement'],
    redirectUri: `${window.location.origin}/auth/callback/facebook`
  },
  twitter: {
    clientId: import.meta.env.VITE_TWITTER_CLIENT_ID,
    authUrl: 'https://twitter.com/i/oauth2/authorize',
    scope: ['tweet.read', 'tweet.write', 'users.read'],
    redirectUri: `${window.location.origin}/auth/callback/twitter`
  },
  instagram: {
    clientId: import.meta.env.VITE_INSTAGRAM_CLIENT_ID,
    authUrl: 'https://api.instagram.com/oauth/authorize',
    scope: ['basic', 'comments', 'relationships'],
    redirectUri: `${window.location.origin}/auth/callback/instagram`
  },
  tiktok: {
    clientId: import.meta.env.VITE_TIKTOK_CLIENT_ID,
    authUrl: 'https://www.tiktok.com/auth/authorize/',
    scope: ['user.info.basic', 'video.list', 'video.upload'],
    redirectUri: `${window.location.origin}/auth/callback/tiktok`
  },
  youtube: {
    clientId: import.meta.env.VITE_YOUTUBE_CLIENT_ID,
    authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    scope: ['https://www.googleapis.com/auth/youtube.upload'],
    redirectUri: `${window.location.origin}/auth/callback/youtube`
  }
}

export const initiatePlatformAuth = async (platform: string): Promise<PlatformConnection | null> => {
  if (!checkRateLimit(platform)) {
    return null;
  }

  try {
    const config = platformConfigs[platform];
    if (!config) {
      throw new Error(`Unsupported platform: ${platform}`);
    }

    // Generate and store state parameter for CSRF protection
    const state = generateRandomString(32);
    sessionStorage.setItem(`${platform}_auth_state`, state);

    // Construct authorization URL with required parameters
    const params = new URLSearchParams({
      client_id: config.clientId,
      redirect_uri: config.redirectUri,
      response_type: 'code',
      scope: config.scope.join(' '),
      state: state
    });

    // Redirect to platform's authorization page
    window.location.href = `${config.authUrl}?${params.toString()}`;
    
    // Return a mock connection for testing
    return {
      platform,
      accessToken: 'test-token',
      refreshToken: 'test-refresh',
      expiresAt: Date.now() + 3600000
    };
  } catch (error) {
    console.error('Authentication error:', error);
    toast({
      title: "Authentication Error",
      description: "Failed to connect to platform. Please try again.",
      variant: "destructive"
    });
    return null;
  }
}

export const handleAuthCallback = async (
  platform: string,
  code: string,
  state: string
): Promise<PlatformConnection | null> => {
  try {
    // Verify state parameter to prevent CSRF attacks
    const storedState = sessionStorage.getItem(`${platform}_auth_state`);
    if (!storedState || storedState !== state) {
      throw new Error('Invalid state parameter');
    }

    // Clear stored state
    sessionStorage.removeItem(`${platform}_auth_state`);

    // Exchange authorization code for access token
    const response = await fetch('/api/auth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        platform,
        code,
        redirect_uri: platformConfigs[platform].redirectUri
      })
    });

    if (!response.ok) {
      throw new Error('Failed to exchange code for token');
    }

    const data = await response.json();
    
    // Return platform connection data
    return {
      platform,
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      expiresAt: Date.now() + (data.expires_in * 1000)
    };
  } catch (error) {
    console.error('Token exchange error:', error);
    toast({
      title: "Connection Error",
      description: "Failed to complete platform connection. Please try again.",
      variant: "destructive"
    });
    return null;
  }
}

// Helper function to generate random string for state parameter
const generateRandomString = (length: number): string => {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let text = '';
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

// Rate limiting implementation
const rateLimits: Record<string, { count: number; resetTime: number }> = {};
const RATE_LIMIT = 100; // requests per hour
const RATE_LIMIT_WINDOW = 3600000; // 1 hour in milliseconds

const checkRateLimit = (platform: string): boolean => {
  const now = Date.now();
  const limit = rateLimits[platform];

  if (!limit || now > limit.resetTime) {
    rateLimits[platform] = {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW
    };
    return true;
  }

  if (limit.count >= RATE_LIMIT) {
    return false;
  }

  limit.count++;
  return true;
}

export const refreshAccessToken = async (
  platform: string,
  refreshToken: string
): Promise<Partial<PlatformConnection> | null> => {
  if (!checkRateLimit(platform)) {
    toast({
      title: "Rate Limit Exceeded",
      description: "Please try again later.",
      variant: "destructive"
    });
    return null;
  }

  try {
    const response = await fetch('/api/auth/refresh', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        platform,
        refresh_token: refreshToken
      })
    });

    if (!response.ok) {
      throw new Error('Failed to refresh token');
    }

    const data = await response.json();
    
    return {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      expiresAt: Date.now() + (data.expires_in * 1000)
    };
  } catch (error) {
    console.error('Token refresh error:', error);
    toast({
      title: "Refresh Error",
      description: "Failed to refresh platform connection. Please reconnect.",
      variant: "destructive"
    });
    return null;
  }
}
