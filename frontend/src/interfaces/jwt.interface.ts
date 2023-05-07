export interface JwtInteface {
  accessToken: string;
  refreshToken: string;
}

export interface DecodedToken {
  exp: number;
}
