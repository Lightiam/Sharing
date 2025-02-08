import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import {
  initiatePlatformAuth,
  handleAuthCallback,
  refreshAccessToken,
  type PlatformConnection
} from '../services/platformAuth'

// Mock window.location
const mockLocation = {
  href: '',
  origin: 'http://localhost:5173'
}
Object.defineProperty(window, 'location', {
  value: mockLocation,
  writable: true
})

// Mock sessionStorage
const mockSessionStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn()
}
Object.defineProperty(window, 'sessionStorage', {
  value: mockSessionStorage
})

// Mock fetch
const mockFetch = vi.fn()
global.fetch = mockFetch

describe('Platform Authentication', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    sessionStorage.clear()
    mockLocation.href = ''
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should initiate OAuth flow with correct parameters', async () => {
    const platform = 'facebook'
    await initiatePlatformAuth(platform)

    expect(mockSessionStorage.setItem).toHaveBeenCalledWith(
      'facebook_auth_state',
      expect.any(String)
    )
    expect(mockLocation.href).toContain('facebook.com/v18.0/dialog/oauth')
    expect(mockLocation.href).toContain('client_id=')
    expect(mockLocation.href).toContain('redirect_uri=')
    expect(mockLocation.href).toContain('state=')
  })

  it('should handle auth callback successfully', async () => {
    const platform = 'facebook'
    const code = 'test_auth_code'
    const state = 'test_state'
    const mockToken = {
      access_token: 'test_access_token',
      refresh_token: 'test_refresh_token',
      expires_in: 3600
    }

    mockSessionStorage.getItem.mockReturnValue(state)
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockToken
    })

    const result = await handleAuthCallback(platform, code, state)

    expect(result).toBeTruthy()
    expect(result?.accessToken).toBe(mockToken.access_token)
    expect(result?.refreshToken).toBe(mockToken.refresh_token)
    expect(mockSessionStorage.removeItem).toHaveBeenCalledWith('facebook_auth_state')
  })

  it('should handle auth callback with invalid state', async () => {
    const platform = 'facebook'
    const code = 'test_auth_code'
    const state = 'invalid_state'

    mockSessionStorage.getItem.mockReturnValue('different_state')

    const result = await handleAuthCallback(platform, code, state)

    expect(result).toBeNull()
  })

  it('should refresh access token successfully', async () => {
    const platform = 'facebook'
    const refreshToken = 'test_refresh_token'
    const mockNewToken = {
      access_token: 'new_access_token',
      refresh_token: 'new_refresh_token',
      expires_in: 3600
    }

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockNewToken
    })

    const result = await refreshAccessToken(platform, refreshToken)

    expect(result).toBeTruthy()
    expect(result?.accessToken).toBe(mockNewToken.access_token)
    expect(result?.refreshToken).toBe(mockNewToken.refresh_token)
  })

  it('should handle rate limiting', async () => {
    const platform = 'facebook'
    
    // Simulate hitting rate limit
    for (let i = 0; i < 101; i++) {
      await initiatePlatformAuth(platform)
    }

    // Next request should fail
    const result = await initiatePlatformAuth(platform)
    expect(result).toBeNull()
  })

  it('should handle network errors gracefully', async () => {
    const platform = 'facebook'
    const refreshToken = 'test_refresh_token'

    mockFetch.mockRejectedValueOnce(new Error('Network error'))

    const result = await refreshAccessToken(platform, refreshToken)

    expect(result).toBeNull()
  })

  it('should handle API errors gracefully', async () => {
    const platform = 'facebook'
    const code = 'test_auth_code'
    const state = 'test_state'

    mockSessionStorage.getItem.mockReturnValue(state)
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
      json: async () => ({ error: 'Invalid request' })
    })

    const result = await handleAuthCallback(platform, code, state)

    expect(result).toBeNull()
  })
})
