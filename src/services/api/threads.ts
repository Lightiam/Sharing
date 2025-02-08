import { ApiResponse, MediaUploadResponse, PlatformApi, PostResponse, platformApiConfigs } from './types';
import { PostContent } from '../platformPost';

// Threads uses Instagram's API infrastructure
const config = platformApiConfigs.instagram;

export const threadsApi: PlatformApi = {
  uploadMedia: async (file: File, token: string): Promise<ApiResponse<MediaUploadResponse>> => {
    try {
      // First create a container for the media using Instagram's API
      const containerResponse = await fetch(
        `${config.baseUrl}/${config.version}/me/media?access_token=${token}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            image_url: URL.createObjectURL(file),
            caption: '',
            media_type: 'THREADS'
          })
        }
      );

      if (!containerResponse.ok) {
        const error = await containerResponse.json();
        throw new Error(error.error?.message || 'Failed to create media container');
      }

      const containerData = await containerResponse.json();
      return {
        success: true,
        data: {
          id: containerData.id,
          type: file.type
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to upload media to Threads'
      };
    }
  },

  createPost: async (
    content: PostContent,
    token: string,
    mediaId?: string
  ): Promise<ApiResponse<PostResponse>> => {
    try {
      // Create a Threads post using Instagram's API
      const response = await fetch(
        `${config.baseUrl}/${config.version}/me/threads?access_token=${token}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            text: content.text,
            media_id: mediaId
          })
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'Failed to create thread');
      }

      const data = await response.json();
      return {
        success: true,
        data: {
          id: data.id,
          url: `https://threads.net/p/${data.id}`,
          status: 'published',
          platform: 'threads'
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create post on Threads'
      };
    }
  },

  deletePost: async (postId: string, token: string): Promise<ApiResponse<void>> => {
    try {
      const response = await fetch(
        `${config.baseUrl}/${config.version}/threads/${postId}?access_token=${token}`,
        {
          method: 'DELETE'
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'Failed to delete thread');
      }

      return {
        success: true
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete post from Threads'
      };
    }
  },

  getPost: async (postId: string, token: string): Promise<ApiResponse<PostResponse>> => {
    try {
      const response = await fetch(
        `${config.baseUrl}/${config.version}/threads/${postId}?access_token=${token}`,
        {
          method: 'GET'
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'Failed to get thread');
      }

      const data = await response.json();
      return {
        success: true,
        data: {
          id: data.id,
          url: `https://threads.net/p/${data.id}`,
          status: 'published',
          platform: 'threads'
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get post from Threads'
      };
    }
  }
};
