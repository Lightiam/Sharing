import { toast } from "../components/ui/use-toast"

export interface PostContent {
  text: string;
  media?: File;
  formatting?: {
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
  };
}

interface PostResponse {
  success: boolean;
  postId?: string;
  error?: string;
}

// Rate limiting implementation
const rateLimits: Record<string, { count: number; resetTime: number }> = {};
const RATE_LIMITS: Record<string, { requests: number; window: number }> = {
  facebook: { requests: 200, window: 3600000 }, // 200 requests per hour
  twitter: { requests: 300, window: 3600000 },  // 300 requests per hour
  instagram: { requests: 200, window: 3600000 }, // 200 requests per hour
  tiktok: { requests: 100, window: 3600000 },   // 100 requests per hour
  youtube: { requests: 100, window: 3600000 }    // 100 requests per hour
};

const checkRateLimit = (platform: string): boolean => {
  const now = Date.now();
  const limit = rateLimits[platform];
  const rateLimit = RATE_LIMITS[platform];

  if (!rateLimit) return false;

  if (!limit || now > limit.resetTime) {
    rateLimits[platform] = {
      count: 1,
      resetTime: now + rateLimit.window
    };
    return true;
  }

  if (limit.count >= rateLimit.requests) {
    return false;
  }

  limit.count++;
  return true;
}

// Facebook posting implementation
export const postToFacebook = async (content: PostContent, accessToken: string): Promise<PostResponse> => {
  if (!checkRateLimit('facebook')) {
    throw new Error('Rate limit exceeded for Facebook. Please try again later.');
  }

  try {
    const formData = new FormData();
    formData.append('message', content.text);
    
    if (content.media) {
      formData.append('source', content.media);
    }

    const response = await fetch(`https://graph.facebook.com/v18.0/me/feed?access_token=${accessToken}`, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error.message);
    }

    const data = await response.json();
    return {
      success: true,
      postId: data.data?.id || data.id
    };
  } catch (error) {
    console.error('Facebook posting error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to post to Facebook'
    };
  }
}

// Twitter/X posting implementation
export const postToTwitter = async (content: PostContent, accessToken: string): Promise<PostResponse> => {
  if (!checkRateLimit('twitter')) {
    throw new Error('Rate limit exceeded for Twitter. Please try again later.');
  }

  try {
    let mediaIds: string[] = [];
    
    // Upload media first if present
    if (content.media) {
      const mediaFormData = new FormData();
      mediaFormData.append('media', content.media);
      
      const mediaResponse = await fetch('https://upload.twitter.com/1.1/media/upload.json', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
        body: mediaFormData
      });

      if (!mediaResponse.ok) {
        throw new Error('Failed to upload media to Twitter');
      }

      const mediaData = await mediaResponse.json();
      mediaIds.push(mediaData.media_id_string);
    }

    // Create the tweet
    const tweetData = {
      text: content.text,
      ...(mediaIds.length > 0 && { media: { media_ids: mediaIds } })
    };

    const response = await fetch('https://api.twitter.com/2/tweets', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(tweetData)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.errors?.[0]?.message || 'Failed to post to Twitter');
    }

    const data = await response.json();
    return {
      success: true,
      postId: data.data?.id || data.id
    };
  } catch (error) {
    console.error('Twitter posting error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to post to Twitter'
    };
  }
}

// Instagram posting implementation
export const postToInstagram = async (content: PostContent, accessToken: string): Promise<PostResponse> => {
  if (!checkRateLimit('instagram')) {
    throw new Error('Rate limit exceeded for Instagram. Please try again later.');
  }

  try {
    // First create a container
    const containerResponse = await fetch(`https://graph.facebook.com/v18.0/me/media?access_token=${accessToken}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image_url: content.media ? URL.createObjectURL(content.media) : undefined,
        caption: content.text
      })
    });

    if (!containerResponse.ok) {
      throw new Error('Failed to create Instagram media container');
    }

    const containerData = await containerResponse.json();

    // Then publish the container
    const publishResponse = await fetch(`https://graph.facebook.com/v18.0/me/media_publish?access_token=${accessToken}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        creation_id: containerData.id
      })
    });

    if (!publishResponse.ok) {
      throw new Error('Failed to publish Instagram post');
    }

    const publishData = await publishResponse.json();
    return {
      success: true,
      postId: publishData.data?.id || publishData.id
    };
  } catch (error) {
    console.error('Instagram posting error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to post to Instagram'
    };
  }
}

// TikTok posting implementation
export const postToTikTok = async (content: PostContent, accessToken: string): Promise<PostResponse> => {
  if (!checkRateLimit('tiktok')) {
    throw new Error('Rate limit exceeded for TikTok. Please try again later.');
  }

  try {
    if (!content.media) {
      throw new Error('Media is required for TikTok posts');
    }

    const formData = new FormData();
    formData.append('video', content.media);
    formData.append('description', content.text);

    const response = await fetch('https://open-api.tiktok.com/share/video/upload/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      },
      body: formData
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error.message);
    }

    const data = await response.json();
    return {
      success: true,
      postId: data.data.share_id
    };
  } catch (error) {
    console.error('TikTok posting error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to post to TikTok'
    };
  }
}

// YouTube Shorts posting implementation
export const postToYouTube = async (content: PostContent, accessToken: string): Promise<PostResponse> => {
  if (!checkRateLimit('youtube')) {
    throw new Error('Rate limit exceeded for YouTube. Please try again later.');
  }

  try {
    if (!content.media) {
      throw new Error('Media is required for YouTube Shorts');
    }

    // First, initiate the upload
    const initiateResponse = await fetch('https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'X-Upload-Content-Length': content.media.size.toString(),
        'X-Upload-Content-Type': content.media.type
      },
      body: JSON.stringify({
        snippet: {
          title: content.text.substring(0, 100), // YouTube title limit
          description: content.text,
          categoryId: '22', // People & Blogs
        },
        status: {
          privacyStatus: 'public',
          selfDeclaredMadeForKids: false
        }
      })
    });

    if (!initiateResponse.ok) {
      throw new Error('Failed to initiate YouTube upload');
    }

    const uploadUrl = initiateResponse.headers.get('Location');
    if (!uploadUrl) {
      throw new Error('No upload URL received from YouTube');
    }

    // Then, upload the video
    const uploadResponse = await fetch(uploadUrl, {
      method: 'PUT',
      body: content.media
    });

    if (!uploadResponse.ok) {
      throw new Error('Failed to upload video to YouTube');
    }

    const data = await uploadResponse.json();
    return {
      success: true,
      postId: data.id
    };
  } catch (error) {
    console.error('YouTube posting error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to post to YouTube'
    };
  }
}

// Helper function to post to multiple platforms
export const postToMultiplePlatforms = async (
  content: PostContent,
  platforms: Array<{ platform: string; accessToken: string }>
): Promise<Record<string, PostResponse>> => {
  const results: Record<string, PostResponse> = {};

  for (const { platform, accessToken } of platforms) {
    try {
      let result: PostResponse;

      switch (platform.toLowerCase()) {
        case 'facebook':
          result = await postToFacebook(content, accessToken);
          break;
        case 'twitter':
        case 'twitter/x':
          result = await postToTwitter(content, accessToken);
          break;
        case 'instagram':
          result = await postToInstagram(content, accessToken);
          break;
        case 'tiktok':
          result = await postToTikTok(content, accessToken);
          break;
        case 'youtube shorts':
        case 'youtube':
          result = await postToYouTube(content, accessToken);
          break;
        default:
          result = {
            success: false,
            error: `Unsupported platform: ${platform}`
          };
      }

      results[platform] = result;

      if (!result.success) {
        toast({
          title: `${platform} Posting Failed`,
          description: result.error,
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error(`Error posting to ${platform}:`, error);
      results[platform] = {
        success: false,
        error: error instanceof Error ? error.message : `Failed to post to ${platform}`
      };
      
      toast({
        title: `${platform} Error`,
        description: `Failed to post to ${platform}. Please try again.`,
        variant: "destructive"
      });
    }
  }

  return results;
}
