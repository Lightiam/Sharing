import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import {
  saveToken,
  getToken,
  removeToken,
  needsRefresh,
  clearAllTokens,
  getAllTokens,
  updateToken
} from '../utils/tokenStorage'

describe('Token Storage', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear()
  })

  afterEach(() => {
    // Clean up after each test
    localStorage.clear()
  })

  it('should save and retrieve a token', () => {
    const platform = 'facebook'
    const accessToken = 'test-access-token'
    const refreshToken = 'test-refresh-token'
    const expiresIn = 3600 // 1 hour

    saveToken(platform, accessToken, refreshToken, expiresIn)
    const token = getToken(platform)

    expect(token).toBeTruthy()
    expect(token?.accessToken).toBe(accessToken)
    expect(token?.refreshToken).toBe(refreshToken)
    expect(token?.expiresAt).toBeGreaterThan(Date.now())
  })

  it('should remove a token', () => {
    const platform = 'twitter'
    const accessToken = 'test-access-token'
    const refreshToken = 'test-refresh-token'
    const expiresIn = 3600

    saveToken(platform, accessToken, refreshToken, expiresIn)
    removeToken(platform)
    const token = getToken(platform)

    expect(token).toBeNull()
  })

  it('should detect when token needs refresh', () => {
    const platform = 'instagram'
    const accessToken = 'test-access-token'
    const refreshToken = 'test-refresh-token'
    const expiresIn = 0 // Expired immediately

    saveToken(platform, accessToken, refreshToken, expiresIn)
    const needsRefreshResult = needsRefresh(platform)

    expect(needsRefreshResult).toBe(true)
  })

  it('should update an existing token', () => {
    const platform = 'facebook'
    const initialAccessToken = 'initial-access-token'
    const initialRefreshToken = 'initial-refresh-token'
    const initialExpiresIn = 3600

    saveToken(platform, initialAccessToken, initialRefreshToken, initialExpiresIn)

    const newAccessToken = 'new-access-token'
    updateToken(platform, newAccessToken)
    const token = getToken(platform)

    expect(token?.accessToken).toBe(newAccessToken)
    expect(token?.refreshToken).toBe(initialRefreshToken)
  })

  it('should clear all tokens', () => {
    const platforms = ['facebook', 'twitter', 'instagram']
    
    platforms.forEach(platform => {
      saveToken(platform, 'access-token', 'refresh-token', 3600)
    })

    clearAllTokens()
    const tokens = getAllTokens()

    expect(Object.keys(tokens)).toHaveLength(0)
  })

  it('should handle invalid token data gracefully', () => {
    localStorage.setItem('spreadify_platform_tokens', 'invalid-json')
    
    const token = getToken('facebook')
    expect(token).toBeNull()
  })

  it('should encrypt and decrypt tokens correctly', () => {
    const platform = 'facebook'
    const accessToken = 'sensitive-access-token'
    const refreshToken = 'sensitive-refresh-token'
    const expiresIn = 3600

    saveToken(platform, accessToken, refreshToken, expiresIn)
    
    // Verify the stored data is encrypted
    const rawStorage = localStorage.getItem('spreadify_platform_tokens')
    expect(rawStorage).not.toContain(accessToken)
    expect(rawStorage).not.toContain(refreshToken)

    // Verify we can decrypt and get the original values
    const token = getToken(platform)
    expect(token?.accessToken).toBe(accessToken)
    expect(token?.refreshToken).toBe(refreshToken)
  })
})
