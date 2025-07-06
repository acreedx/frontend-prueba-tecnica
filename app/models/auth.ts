export interface AuthTokenResponse {
  success: boolean;
  message: string;
}

export interface AuthTokenRequest {
  accountId: string;
  authorizationId: string;
}
