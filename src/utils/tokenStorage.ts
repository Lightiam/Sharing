interface StoredToken {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

interface TokenStorage {
  [platform: string]: StoredToken;
}

// Use secure storage mechanism (localStorage in this case, but should be replaced with more secure solution in production)
const STORAGE_KEY = 'spreadify_platform_tokens';

// Helper to encrypt tokens before storage
const encryptToken = (token: string): string => {
  // In production, implement proper encryption
  // For now, using base64 just to demonstrate the concept
  return btoa(token);
}

// Helper to decrypt stored tokens
const decryptToken = (encryptedToken: string): string => {
  // In production, implement proper decryption
  // For now, using base64 just to demonstrate the concept
  return atob(encryptedToken);
}

// Save token for a specific platform
export const saveToken = (platform: string, accessToken: string, refreshToken: string, expiresIn: number): void => {
  try {
    const storage: TokenStorage = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    
    storage[platform] = {
      accessToken: encryptToken(accessToken),
      refreshToken: encryptToken(refreshToken),
      expiresAt: Date.now() + (expiresIn * 1000)
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));
  } catch (error) {
    console.error('Failed to save token:', error);
    throw new Error('Failed to save platform token');
  }
}

// Get token for a specific platform
export const getToken = (platform: string): StoredToken | null => {
  try {
    const storage: TokenStorage = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    const token = storage[platform];

    if (!token) return null;

    return {
      accessToken: decryptToken(token.accessToken),
      refreshToken: decryptToken(token.refreshToken),
      expiresAt: token.expiresAt
    };
  } catch (error) {
    console.error('Failed to retrieve token:', error);
    return null;
  }
}

// Remove token for a specific platform
export const removeToken = (platform: string): void => {
  try {
    const storage: TokenStorage = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    delete storage[platform];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));
  } catch (error) {
    console.error('Failed to remove token:', error);
    throw new Error('Failed to remove platform token');
  }
}

// Check if token needs refresh
export const needsRefresh = (platform: string): boolean => {
  const token = getToken(platform);
  if (!token) return true;

  // Add 5-minute buffer to ensure token doesn't expire during use
  const REFRESH_BUFFER = 5 * 60 * 1000; // 5 minutes in milliseconds
  return Date.now() + REFRESH_BUFFER >= token.expiresAt;
}

// Clear all stored tokens
export const clearAllTokens = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear tokens:', error);
    throw new Error('Failed to clear platform tokens');
  }
}

// Get all stored platform tokens
export const getAllTokens = (): TokenStorage => {
  try {
    const storage: TokenStorage = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    const decryptedStorage: TokenStorage = {};

    for (const [platform, token] of Object.entries(storage)) {
      decryptedStorage[platform] = {
        accessToken: decryptToken(token.accessToken),
        refreshToken: decryptToken(token.refreshToken),
        expiresAt: token.expiresAt
      };
    }

    return decryptedStorage;
  } catch (error) {
    console.error('Failed to retrieve tokens:', error);
    return {};
  }
}

// Update token for a specific platform
export const updateToken = (
  platform: string,
  accessToken: string,
  refreshToken?: string,
  expiresIn?: number
): void => {
  try {
    const storage: TokenStorage = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    const currentToken = storage[platform];

    if (!currentToken) {
      throw new Error('No existing token found for platform');
    }

    storage[platform] = {
      accessToken: encryptToken(accessToken),
      refreshToken: refreshToken ? encryptToken(refreshToken) : currentToken.refreshToken,
      expiresAt: expiresIn ? Date.now() + (expiresIn * 1000) : currentToken.expiresAt
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));
  } catch (error) {
    console.error('Failed to update token:', error);
    throw new Error('Failed to update platform token');
  }
}
