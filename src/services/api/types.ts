import { PostContent } from '../platformPost';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface MediaUploadResponse {
  id: string;
  url?: string;
  type: string;
}

export interface PostResponse {
  id: string;
  url?: string;
  status: 'published' | 'scheduled' | 'failed';
  platform: string;
}

export interface PlatformApiConfig {
  version: string;
  baseUrl: string;
  uploadUrl?: string;
  rateLimit: {
    requests: number;
    window: number; // in milliseconds
  };
}

// Add Vite env type definitions
interface ImportMetaEnv {
  VITE_FACEBOOK_API_VERSION: string;
  VITE_TWITTER_API_VERSION: string;
  VITE_INSTAGRAM_API_VERSION: string;
  VITE_TIKTOK_API_VERSION: string;
  VITE_YOUTUBE_API_VERSION: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

export interface PlatformApi {
  uploadMedia: (file: File, token: string) => Promise<ApiResponse<MediaUploadResponse>>;
  createPost: (content: PostContent, token: string, mediaId?: string) => Promise<ApiResponse<PostResponse>>;
  deletePost: (postId: string, token: string) => Promise<ApiResponse<void>>;
  getPost: (postId: string, token: string) => Promise<ApiResponse<PostResponse>>;
}

export const platformApiConfigs: Record<string, PlatformApiConfig> = {
  facebook: {
    version: import.meta.env.VITE_FACEBOOK_API_VERSION,
    baseUrl: 'https://graph.facebook.com',
    rateLimit: {
      requests: 200,
      window: 3600000 // 1 hour
    }
  },
  twitter: {
    version: import.meta.env.VITE_TWITTER_API_VERSION,
    baseUrl: 'https://api.twitter.com',
    uploadUrl: 'https://upload.twitter.com',
    rateLimit: {
      requests: 300,
      window: 3600000
    }
  },
  instagram: {
    version: import.meta.env.VITE_INSTAGRAM_API_VERSION,
    baseUrl: 'https://graph.instagram.com',
    rateLimit: {
      requests: 200,
      window: 3600000
    }
  },
  tiktok: {
    version: import.meta.env.VITE_TIKTOK_API_VERSION,
    baseUrl: 'https://open-api.tiktok.com',
    rateLimit: {
      requests: 100,
      window: 3600000
    }
  },
  youtube: {
    version: import.meta.env.VITE_YOUTUBE_API_VERSION,
    baseUrl: 'https://www.googleapis.com/youtube',
    uploadUrl: 'https://www.googleapis.com/upload/youtube',
    rateLimit: {
      requests: 100,
      window: 3600000
    }
  }
};
