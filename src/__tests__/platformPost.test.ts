import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  postToFacebook,
  postToTwitter,
  postToInstagram,
  postToTikTok,
  postToYouTube,
  postToMultiplePlatforms,
  type PostContent
} from '../services/platformPost'

// Mock fetch globally
const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

// Mock URL.createObjectURL
const mockCreateObjectURL = vi.fn(() => 'mock-url');
vi.stubGlobal('URL', { createObjectURL: mockCreateObjectURL });

// Mock toast
vi.mock('../components/ui/use-toast', () => ({
  toast: vi.fn()
}));

// Mock rate limiting
vi.mock('../services/platformAuth', () => ({
  checkRateLimit: vi.fn(() => true)
}));

describe('Platform Posting Services', () => {
  const mockContent: PostContent = {
    text: 'Test post content',
    media: new File(['test'], 'test.jpg', { type: 'image/jpeg' }),
    formatting: {
      bold: true,
      italic: false,
      underline: false
    }
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockCreateObjectURL.mockClear();
    mockFetch.mockImplementation(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ 
        data: { id: 'test-post-id' },
        success: true,
        error: null
      })
    }));
  });

  describe('Facebook Posting', () => {
    it('should post content to Facebook successfully', async () => {
      const result = await postToFacebook(mockContent, 'test-token');
      expect(result.success).toBe(true);
      expect(result.postId).toBe('test-post-id');
    });

    it('should handle Facebook posting errors', async () => {
      mockFetch.mockImplementationOnce(() => Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ error: { message: 'Test error' }, success: false })
      }));

      const result = await postToFacebook(mockContent, 'test-token');
      expect(result.success).toBe(false);
      expect(result.error).toBe('Test error');
    });
  });

  describe('Twitter Posting', () => {
    it('should post content to Twitter successfully', async () => {
      mockFetch.mockImplementationOnce(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ data: { id: 'test-post-id' }, success: true })
      }));

      const result = await postToTwitter(mockContent, 'test-token');
      expect(result.success).toBe(true);
      expect(result.postId).toBe('test-post-id');
    });

    it('should handle Twitter media upload errors', async () => {
      mockFetch.mockImplementationOnce(() => Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ errors: [{ message: 'Failed to upload media' }], success: false })
      }));

      const result = await postToTwitter(mockContent, 'test-token');
      expect(result.success).toBe(false);
      expect(result.error).toContain('upload');
    });
  });

  describe('Instagram Posting', () => {
    it('should post content to Instagram successfully', async () => {
      mockFetch.mockImplementationOnce(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ data: { id: 'test-post-id' }, success: true })
      }));

      const result = await postToInstagram(mockContent, 'test-token');
      expect(result.success).toBe(true);
      expect(result.postId).toBe('test-post-id');
    });

    it('should handle Instagram container creation errors', async () => {
      mockFetch.mockImplementationOnce(() => Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ error: { message: 'Container creation failed' }, success: false })
      }));

      const result = await postToInstagram(mockContent, 'test-token');
      expect(result.success).toBe(false);
      expect(result.error).toContain('container');
    });
  });

  describe('Multi-platform Posting', () => {
    it('should post to multiple platforms successfully', async () => {
      const platforms = [
        { platform: 'facebook', accessToken: 'test-token' },
        { platform: 'twitter', accessToken: 'test-token' }
      ];

      mockFetch
        .mockImplementationOnce(() => Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ data: { id: 'test-post-id' }, success: true })
        }))
        .mockImplementationOnce(() => Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ data: { id: 'test-post-id' }, success: true })
        }));

      const results = await postToMultiplePlatforms(mockContent, platforms);
      expect(results.facebook.success).toBe(true);
      expect(results.twitter.success).toBe(true);
    });

    it('should handle mixed success/failure scenarios', async () => {
      const platforms = [
        { platform: 'facebook', accessToken: 'test-token' },
        { platform: 'twitter', accessToken: 'test-token' }
      ];

      mockFetch
        .mockImplementationOnce(() => Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ data: { id: 'test-post-id' }, success: true })
        }))
        .mockImplementationOnce(() => Promise.resolve({
          ok: false,
          json: () => Promise.resolve({ errors: [{ message: 'Failed' }], success: false })
        }));

      const results = await postToMultiplePlatforms(mockContent, platforms);
      expect(results.facebook.success).toBe(true);
      expect(results.twitter.success).toBe(false);
    });
  });
});
