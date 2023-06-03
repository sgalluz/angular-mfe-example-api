export const REFRESH_TOKEN_NAME = "ng_mfe_sso";
export const REFRESH_TOKEN_AGE_IN_MS = 24 * 60 * 60 * 3600;

export interface Token {
  jwtToken: string;
}
