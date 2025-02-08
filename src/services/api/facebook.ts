import { ApiResponse, MediaUploadResponse, PlatformApi, PostResponse, platformApiConfigs } from './types';
import { PostContent } from '../platformPost';

const config = platformApiConfigs.facebook;

export const facebookApi: PlatformApi = {
  uploadMedia: async (file: File, token: string): Promise<ApiResponse<MediaUploadResponse>> => {
    try {
      const formData = new FormData();
      formData.append('source', file);

      const response = await fetch(
        `${config.baseUrl}/${config.version}/me/photos?access_token=${token}`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error.message);
      }

      const data = await response.json();
      return {
        success: true,
        data: {
          id: data.id,
          url: data.url,
          type: file.type
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to upload media to Facebook'
      };
    }
  },

  createPost: async (
    content: PostContent,
    token: string,
    mediaId?: string
  ): Promise<ApiResponse<PostResponse>> => {
    try {
      const postData: Record<string, any> = {
        message: content.text,
      };

      if (mediaId) {
        if (content.media?.type.startsWith('video/')) {
          postData.video_id = mediaId;
        } else {
          postData.photo_id = mediaId;
        }
      }

      const response = await fetch(
        `${config.baseUrl}/${config.version}/me/feed?access_token=${token}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(postData),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error.message);
      }

      const data = await response.json();
      return {
        success: true,
        data: {
          id: data.id,
          url: `https://facebook.com/${data.id}`,
          status: 'published',
          platform: 'facebook'
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create post on Facebook'
      };
    }
  },

  deletePost: async (postId: string, token: string): Promise<ApiResponse<void>> => {
    try {
      const response = await fetch(
        `${config.baseUrl}/${config.version}/${postId}?access_token=${token}`,
        {
          method: 'DELETE',
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error.message);
      }

      return {
        success: true
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete post from Facebook'
      };
    }
  },

  getPost: async (postId: string, token: string): Promise<ApiResponse<PostResponse>> => {
    try {
      const response = await fetch(
        `${config.baseUrl}/${config.version}/${postId}?access_token=${token}`,
        {
          method: 'GET',
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error.message);
      }

      const data = await response.json();
      return {
        success: true,
        data: {
          id: data.id,
          url: `https://facebook.com/${data.id}`,
          status: 'published',
          platform: 'facebook'
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get post from Facebook'
      };
    }
  }
};
