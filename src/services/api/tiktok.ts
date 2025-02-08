import { ApiResponse, MediaUploadResponse, PlatformApi, PostResponse, platformApiConfigs } from './types';
import { PostContent } from '../platformPost';

const config = platformApiConfigs.tiktok;

export const tiktokApi: PlatformApi = {
  uploadMedia: async (file: File, token: string): Promise<ApiResponse<MediaUploadResponse>> => {
    try {
      // First request upload URL
      const initResponse = await fetch(
        `${config.baseUrl}/share/video/upload/`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            source: 'FILE',
            video_size: file.size
          })
        }
      );

      if (!initResponse.ok) {
        const error = await initResponse.json();
        throw new Error(error.error?.message || 'Failed to initialize upload');
      }

      const initData = await initResponse.json();
      const uploadUrl = initData.data.upload_url;

      // Upload the video
      const formData = new FormData();
      formData.append('video', file);

      const uploadResponse = await fetch(uploadUrl, {
        method: 'POST',
        body: formData
      });

      if (!uploadResponse.ok) {
        const error = await uploadResponse.json();
        throw new Error(error.error?.message || 'Failed to upload video');
      }

      const uploadData = await uploadResponse.json();
      return {
        success: true,
        data: {
          id: uploadData.data.video_id,
          type: file.type
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to upload media to TikTok'
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
        throw new Error('Media ID is required for TikTok posts');
      }

      const response = await fetch(
        `${config.baseUrl}/share/video/upload/`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            video_id: mediaId,
            text: content.text,
            privacy_level: 'PUBLIC'
          })
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'Failed to create post');
      }

      const data = await response.json();
      return {
        success: true,
        data: {
          id: data.data.share_id,
          url: data.data.share_url,
          status: 'published',
          platform: 'tiktok'
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create post on TikTok'
      };
    }
  },

  deletePost: async (postId: string, token: string): Promise<ApiResponse<void>> => {
    try {
      const response = await fetch(
        `${config.baseUrl}/share/video/delete/`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            share_id: postId
          })
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
        error: error instanceof Error ? error.message : 'Failed to delete post from TikTok'
      };
    }
  },

  getPost: async (postId: string, token: string): Promise<ApiResponse<PostResponse>> => {
    try {
      const response = await fetch(
        `${config.baseUrl}/share/video/detail/`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            share_id: postId
          })
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
          id: data.data.share_id,
          url: data.data.share_url,
          status: 'published',
          platform: 'tiktok'
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get post from TikTok'
      };
    }
  }
};
