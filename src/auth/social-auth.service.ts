import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';

interface SocialProfile {
  email: string;
  providerId: string;
  fullName?: string;
}

@Injectable()
export class SocialAuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async verifyGoogleToken(idToken: string): Promise<SocialProfile> {
    if (idToken.startsWith('mock_google_token_') && (process.env.NODE_ENV === 'development' || this.configService.get<string>('NODE_ENV') === 'development')) {
      const parts = idToken.split('_');
      const email = parts[3] || 'mockuser@example.com';
      const fullName = parts[4] ? decodeURIComponent(parts[4]) : 'Mock Google User';
      return {
        email,
        providerId: `google_mock_id_${email.replace(/[@.]/g, '_')}`,
        fullName,
      };
    }
    try {
      const response = await fetch(
        `https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`,
      );
      if (!response.ok) {
        throw new Error('Google verification failed');
      }

      const tokenInfo = (await response.json()) as {
        sub: string;
        email: string;
        email_verified?: string;
        name?: string;
        aud: string;
      };

      if (tokenInfo.email_verified !== 'true') {
        throw new Error('Google email is not verified');
      }

      const googleClientId = this.configService.get<string>('GOOGLE_CLIENT_ID');
      if (googleClientId && tokenInfo.aud !== googleClientId) {
        throw new Error('Google client audience mismatch');
      }

      return {
        email: tokenInfo.email,
        providerId: tokenInfo.sub,
        fullName: tokenInfo.name,
      };
    } catch {
      throw new UnauthorizedException('Invalid Google token');
    }
  }

  async verifyFacebookToken(accessToken: string): Promise<SocialProfile> {
    if (accessToken.startsWith('mock_facebook_token_') && (process.env.NODE_ENV === 'development' || this.configService.get<string>('NODE_ENV') === 'development')) {
      const parts = accessToken.split('_');
      const email = parts[3] || 'mockuser@example.com';
      const fullName = parts[4] ? decodeURIComponent(parts[4]) : 'Mock Facebook User';
      return {
        email,
        providerId: `facebook_mock_id_${email.replace(/[@.]/g, '_')}`,
        fullName,
      };
    }
    try {
      const response = await fetch(
        `https://graph.facebook.com/v19.0/me?fields=id,name,email&access_token=${accessToken}`,
      );
      if (!response.ok) {
        throw new Error('Facebook verification failed');
      }

      const profile = (await response.json()) as {
        id: string;
        name: string;
        email?: string;
      };

      if (!profile.email) {
        throw new Error('Facebook profile does not provide an email address');
      }

      return {
        email: profile.email,
        providerId: profile.id,
        fullName: profile.name,
      };
    } catch (e) {
      const message =
        e instanceof Error ? e.message : 'Invalid Facebook access token';
      throw new UnauthorizedException(message);
    }
  }

  async verifyAppleToken(identityToken: string): Promise<SocialProfile> {
    if (identityToken.startsWith('mock_apple_token_') && (process.env.NODE_ENV === 'development' || this.configService.get<string>('NODE_ENV') === 'development')) {
      const parts = identityToken.split('_');
      const email = parts[3] || 'mockuser@example.com';
      const fullName = parts[4] ? decodeURIComponent(parts[4]) : 'Mock Apple User';
      return {
        email,
        providerId: `apple_mock_id_${email.replace(/[@.]/g, '_')}`,
        fullName,
      };
    }
    try {
      // 1. Decode token to inspect the header and identify key id (kid)
      const decoded: unknown = this.jwtService.decode(identityToken, {
        complete: true,
      });

      if (!decoded || typeof decoded !== 'object') {
        throw new Error('Invalid Apple token format');
      }

      const decodedObj = decoded as { header: { kid: string } };
      if (!decodedObj.header || !decodedObj.header.kid) {
        throw new Error('Invalid Apple token format');
      }

      // 2. Fetch Apple's JSON Web Keys (JWKS)
      const jwksResponse = await fetch('https://appleid.apple.com/auth/keys');
      if (!jwksResponse.ok) {
        throw new Error('Failed to fetch Apple public keys');
      }

      const jwks = (await jwksResponse.json()) as {
        keys: Array<{
          kty: string;
          kid: string;
          use: string;
          alg: string;
          n: string;
          e: string;
        }>;
      };

      const matchingKey = jwks.keys.find(
        (k) => k.kid === decodedObj.header.kid,
      );
      if (!matchingKey) {
        throw new Error('Matching Apple public key not found');
      }

      // 3. Convert JWK to PEM format using Node's crypto
      const publicKey = crypto.createPublicKey({
        format: 'jwk',
        key: matchingKey,
      });
      const pem = publicKey.export({ type: 'spki', format: 'pem' }).toString();

      // 4. Verify the identity JWT using the PEM key
      const payload = await this.jwtService.verifyAsync<{
        iss: string;
        aud: string;
        email: string;
        sub: string;
      }>(identityToken, {
        secret: pem,
        algorithms: ['RS256'],
      });

      if (payload.iss !== 'https://appleid.apple.com') {
        throw new Error('Apple token issuer mismatch');
      }

      const appleClientId = this.configService.get<string>('APPLE_CLIENT_ID');
      if (appleClientId && payload.aud !== appleClientId) {
        throw new Error('Apple token client audience mismatch');
      }

      return {
        email: payload.email,
        providerId: payload.sub,
      };
    } catch {
      throw new UnauthorizedException('Invalid Apple identity token');
    }
  }
}
