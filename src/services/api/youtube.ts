import { ApiResponse, MediaUploadResponse, PlatformApi, PostResponse, platformApiConfigs } from './types';
import { PostContent } from '../platformPost';

const config = platformApiConfigs.youtube;

export const youtubeApi: PlatformApi = {
  uploadMedia: async (file: File, token: string): Promise<ApiResponse<MediaUploadResponse>> => {
    try {
      // First, initiate the upload
      const initiateResponse = await fetch(
        `${config.uploadUrl}/${config.version}/videos?uploadType=resumable&part=snippet,status`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'X-Upload-Content-Length': file.size.toString(),
            'X-Upload-Content-Type': file.type
          },
          body: JSON.stringify({
            snippet: {
              title: 'Untitled', // Will be updated in createPost
              description: '',
              categoryId: '22', // People & Blogs
            },
            status: {
              privacyStatus: 'private', // Start as private, will be made public in createPost
              selfDeclaredMadeForKids: false
            }
          })
        }
      );

      if (!initiateResponse.ok) {
        const error = await initiateResponse.json();
        throw new Error(error.error?.message || 'Failed to initiate upload');
      }

      const uploadUrl = initiateResponse.headers.get('Location');
      if (!uploadUrl) {
        throw new Error('No upload URL received');
      }

      // Then, upload the video
      const uploadResponse = await fetch(uploadUrl, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': file.type,
          'Content-Length': file.size.toString()
        },
        body: file
      });

      if (!uploadResponse.ok) {
        const error = await uploadResponse.json();
        throw new Error(error.error?.message || 'Failed to upload video');
      }

      const uploadData = await uploadResponse.json();
      return {
        success: true,
        data: {
          id: uploadData.id,
          type: file.type
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to upload media to YouTube'
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
        throw new Error('Media ID is required for YouTube posts');
      }

      // Update video metadata
      const response = await fetch(
        `${config.baseUrl}/${config.version}/videos?part=snippet,status&key=${token}`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id: mediaId,
            snippet: {
              title: content.text.substring(0, 100), // YouTube title limit
              description: content.text,
              categoryId: '22', // People & Blogs
              tags: ['#Shorts'] // Mark as YouTube Short
            },
            status: {
              privacyStatus: 'public',
              selfDeclaredMadeForKids: false
            }
          })
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'Failed to update video');
      }

      const data = await response.json();
      return {
        success: true,
        data: {
          id: data.id,
          url: `https://youtube.com/watch?v=${data.id}`,
          status: 'published',
          platform: 'youtube'
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create post on YouTube'
      };
    }
  },

  deletePost: async (postId: string, token: string): Promise<ApiResponse<void>> => {
    try {
      const response = await fetch(
        `${config.baseUrl}/${config.version}/videos?id=${postId}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'Failed to delete video');
      }

      return {
        success: true
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete post from YouTube'
      };
    }
  },

  getPost: async (postId: string, token: string): Promise<ApiResponse<PostResponse>> => {
    try {
      const response = await fetch(
        `${config.baseUrl}/${config.version}/videos?part=snippet,status&id=${postId}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'Failed to get video');
      }

      const data = await response.json();
      return {
        success: true,
        data: {
          id: data.items[0].id,
          url: `https://youtube.com/watch?v=${data.items[0].id}`,
          status: data.items[0].status.privacyStatus === 'public' ? 'published' : 'failed',
          platform: 'youtube'
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get post from YouTube'
      };
    }
  }
};
