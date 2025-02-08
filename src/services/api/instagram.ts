import { ApiResponse, MediaUploadResponse, PlatformApi, PostResponse, platformApiConfigs } from './types';
import { PostContent } from '../platformPost';

const config = platformApiConfigs.instagram;

export const instagramApi: PlatformApi = {
  uploadMedia: async (file: File, token: string): Promise<ApiResponse<MediaUploadResponse>> => {
    try {
      // First create a container for the media
      const containerResponse = await fetch(
        `${config.baseUrl}/${config.version}/me/media?access_token=${token}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            image_url: URL.createObjectURL(file),
            caption: ''
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
        error: error instanceof Error ? error.message : 'Failed to upload media to Instagram'
      };
    }
  },

  createPost: async (
    content: PostContent,
    token: string,
    mediaId?: string
  ): Promise<ApiResponse<PostResponse>> => {
    try {
      if (!mediaId) {
        throw new Error('Media ID is required for Instagram posts');
      }

      // Publish the container
      const response = await fetch(
        `${config.baseUrl}/${config.version}/me/media_publish?access_token=${token}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            creation_id: mediaId,
            caption: content.text
          })
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'Failed to publish post');
      }

      const data = await response.json();
      return {
        success: true,
        data: {
          id: data.id,
          url: `https://instagram.com/p/${data.id}`,
          status: 'published',
          platform: 'instagram'
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create post on Instagram'
      };
    }
  },

  deletePost: async (postId: string, token: string): Promise<ApiResponse<void>> => {
    try {
      const response = await fetch(
        `${config.baseUrl}/${config.version}/media/${postId}?access_token=${token}`,
        {
          method: 'DELETE'
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'Failed to delete post');
      }

      return {
        success: true
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete post from Instagram'
      };
    }
  },

  getPost: async (postId: string, token: string): Promise<ApiResponse<PostResponse>> => {
    try {
      const response = await fetch(
        `${config.baseUrl}/${config.version}/media/${postId}?access_token=${token}&fields=id,permalink,caption`,
        {
          method: 'GET'
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'Failed to get post');
      }

      const data = await response.json();
      return {
        success: true,
        data: {
          id: data.id,
          url: data.permalink,
          status: 'published',
          platform: 'instagram'
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get post from Instagram'
      };
    }
  }
};
