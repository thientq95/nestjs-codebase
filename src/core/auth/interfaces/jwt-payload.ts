export interface JwtPayload {
  sub: number;
  email: string;
  name: string;
}

export interface JwtPayloadRefreshToken extends JwtPayload {
  refreshToken: string;
}
