import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
interface SocialProfile {
    email: string;
    providerId: string;
    fullName?: string;
}
export declare class SocialAuthService {
    private readonly configService;
    private readonly jwtService;
    constructor(configService: ConfigService, jwtService: JwtService);
    verifyGoogleToken(idToken: string): Promise<SocialProfile>;
    verifyFacebookToken(accessToken: string): Promise<SocialProfile>;
    verifyAppleToken(identityToken: string): Promise<SocialProfile>;
}
export {};
