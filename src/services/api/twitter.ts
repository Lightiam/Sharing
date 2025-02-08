import { ApiResponse, MediaUploadResponse, PlatformApi, PostResponse, platformApiConfigs } from './types';
import { PostContent } from '../platformPost';

const config = platformApiConfigs.twitter;

export const twitterApi: PlatformApi = {
  uploadMedia: async (file: File, token: string): Promise<ApiResponse<MediaUploadResponse>> => {
    try {
      const formData = new FormData();
      formData.append('media', file);

      const response = await fetch(
        `${config.uploadUrl}/${config.version}/media/upload`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.errors?.[0]?.message || 'Failed to upload media');
      }

      const data = await response.json();
      return {
        success: true,
        data: {
          id: data.media_id_string,
          type: file.type
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to upload media to Twitter'
      };
    }
  },

  createPost: async (
    content: PostContent,
    token: string,
    mediaId?: string
  ): Promise<ApiResponse<PostResponse>> => {
    try {
      const tweetData: Record<string, any> = {
        text: content.text
      };

      if (mediaId) {
        tweetData.media = {
          media_ids: [mediaId]
        };
      }

      const response = await fetch(
        `${config.baseUrl}/${config.version}/tweets`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(tweetData),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.errors?.[0]?.message || 'Failed to create tweet');
      }

      const data = await response.json();
      return {
        success: true,
        data: {
          id: data.data.id,
          url: `https://twitter.com/i/web/status/${data.data.id}`,
          status: 'published',
          platform: 'twitter'
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create post on Twitter'
      };
    }
  },

  deletePost: async (postId: string, token: string): Promise<ApiResponse<void>> => {
    try {
      const response = await fetch(
        `${config.baseUrl}/${config.version}/tweets/${postId}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.errors?.[0]?.message || 'Failed to delete tweet');
      }

      return {
        success: true
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete post from Twitter'
      };
    }
  },

  getPost: async (postId: string, token: string): Promise<ApiResponse<PostResponse>> => {
    try {
      const response = await fetch(
        `${config.baseUrl}/${config.version}/tweets/${postId}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.errors?.[0]?.message || 'Failed to get tweet');
      }

      const data = await response.json();
      return {
        success: true,
        data: {
          id: data.data.id,
          url: `https://twitter.com/i/web/status/${data.data.id}`,
          status: 'published',
          platform: 'twitter'
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get post from Twitter'
      };
    }
  }
};
