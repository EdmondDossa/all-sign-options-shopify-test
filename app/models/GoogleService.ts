// ~/services/GoogleService.ts
interface GoogleTokenResponse {
    access_token: string;
    expires_in: number;
    token_type: string;
    scope?: string;
    refresh_token?: string;
  }
  
  class GoogleService {
    private clientId: string;
    private clientSecret: string;
    private refreshToken: string;
    private cachedToken: string | null = null;
    private tokenExpiry: number = 0;
  
    constructor() {
      this.clientId = process.env.GOOGLE_DRIVE_CLIENT_ID || '';
      this.clientSecret = process.env.GOOGLE_DRIVE_CLIENT_SECRET || '';
      this.refreshToken = process.env.GOOGLE_DRIVE_REFRESH_TOKEN || '';
    }
  
    /**
     * Validates if all required Google OAuth credentials are present
     */
    private validateCredentials(): boolean {
      return !!(this.clientId && this.clientSecret && this.refreshToken);
    }
  
    /**
     * Checks if the current cached token is still valid
     */
    private isTokenValid(): boolean {
      return !!(this.cachedToken && Date.now() < this.tokenExpiry);
    }
  
    /**
     * Refreshes the Google OAuth access token
     */
    private async refreshAccessToken(): Promise<string> {
      const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          client_id: this.clientId,
          client_secret: this.clientSecret,
          refresh_token: this.refreshToken,
          grant_type: "refresh_token",
        }),
      });
  
      if (!tokenResponse.ok) {
        const errorData = await tokenResponse.json();
        throw new Error(`Google OAuth error: ${JSON.stringify(errorData)}`);
      }
  
      const tokenData: GoogleTokenResponse = await tokenResponse.json();
      
      // Cache the token with expiry time (subtract 5 minutes for safety)
      this.cachedToken = tokenData.access_token;
      this.tokenExpiry = Date.now() + (tokenData.expires_in - 300) * 1000;
  
      return tokenData.access_token;
    }
  
    /**
     * Gets a valid access token (from cache or by refreshing)
     * @returns Promise<string> - The access token
     * @throws Error if credentials are missing or token refresh fails
     */
    async getAccessToken(): Promise<string> {
      // Validate credentials first
      if (!this.validateCredentials()) {
        throw new Error("Missing Google OAuth configuration. Please check GOOGLE_DRIVE_CLIENT_ID, GOOGLE_DRIVE_CLIENT_SECRET, and GOOGLE_DRIVE_REFRESH_TOKEN environment variables.");
      }
  
      // Return cached token if still valid
      if (this.isTokenValid()) {
        return this.cachedToken!;
      }
  
      // Refresh token if expired or not available
      return await this.refreshAccessToken();
    }



     /**
     * Deletes a file from Google Drive
     * @param fileId - The Google Drive file ID to delete
     * @returns Promise<boolean> - True if deleted successfully, false otherwise
     * @throws Error if deletion fails
     */
    async deleteFile(fileId: string): Promise<boolean> {
        const accessToken = await this.getAccessToken();
        
        const response = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
        });

        if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Failed to delete file from Google Drive: ${response.status} ${response.statusText}. ${JSON.stringify(errorData)}`);
        }

        return true;
    }
  
    /**
     * Clears the cached token (useful for testing or forcing refresh)
     */
    clearCache(): void {
      this.cachedToken = null;
      this.tokenExpiry = 0;
    }
  }

  export default new GoogleService();
