"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocialAuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const crypto = __importStar(require("crypto"));
let SocialAuthService = class SocialAuthService {
    configService;
    jwtService;
    constructor(configService, jwtService) {
        this.configService = configService;
        this.jwtService = jwtService;
    }
    async verifyGoogleToken(idToken) {
        if (idToken.startsWith('mock_google_token_') &&
            (process.env.NODE_ENV === 'development' ||
                this.configService.get('NODE_ENV') === 'development')) {
            const parts = idToken.split('_');
            const email = parts[3] || 'mockuser@example.com';
            const fullName = parts[4]
                ? decodeURIComponent(parts[4])
                : 'Mock Google User';
            return {
                email,
                providerId: `google_mock_id_${email.replace(/[@.]/g, '_')}`,
                fullName,
            };
        }
        try {
            const response = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`);
            if (!response.ok) {
                throw new Error('Google verification failed');
            }
            const tokenInfo = (await response.json());
            if (tokenInfo.email_verified !== 'true') {
                throw new Error('Google email is not verified');
            }
            const googleClientId = this.configService.get('GOOGLE_CLIENT_ID');
            if (googleClientId && tokenInfo.aud !== googleClientId) {
                throw new Error('Google client audience mismatch');
            }
            return {
                email: tokenInfo.email,
                providerId: tokenInfo.sub,
                fullName: tokenInfo.name,
            };
        }
        catch {
            throw new common_1.UnauthorizedException('Invalid Google token');
        }
    }
    async verifyFacebookToken(accessToken) {
        if (accessToken.startsWith('mock_facebook_token_') &&
            (process.env.NODE_ENV === 'development' ||
                this.configService.get('NODE_ENV') === 'development')) {
            const parts = accessToken.split('_');
            const email = parts[3] || 'mockuser@example.com';
            const fullName = parts[4]
                ? decodeURIComponent(parts[4])
                : 'Mock Facebook User';
            return {
                email,
                providerId: `facebook_mock_id_${email.replace(/[@.]/g, '_')}`,
                fullName,
            };
        }
        try {
            const response = await fetch(`https://graph.facebook.com/v19.0/me?fields=id,name,email&access_token=${accessToken}`);
            if (!response.ok) {
                throw new Error('Facebook verification failed');
            }
            const profile = (await response.json());
            if (!profile.email) {
                throw new Error('Facebook profile does not provide an email address');
            }
            return {
                email: profile.email,
                providerId: profile.id,
                fullName: profile.name,
            };
        }
        catch (e) {
            const message = e instanceof Error ? e.message : 'Invalid Facebook access token';
            throw new common_1.UnauthorizedException(message);
        }
    }
    async verifyAppleToken(identityToken) {
        if (identityToken.startsWith('mock_apple_token_') &&
            (process.env.NODE_ENV === 'development' ||
                this.configService.get('NODE_ENV') === 'development')) {
            const parts = identityToken.split('_');
            const email = parts[3] || 'mockuser@example.com';
            const fullName = parts[4]
                ? decodeURIComponent(parts[4])
                : 'Mock Apple User';
            return {
                email,
                providerId: `apple_mock_id_${email.replace(/[@.]/g, '_')}`,
                fullName,
            };
        }
        try {
            const decoded = this.jwtService.decode(identityToken, {
                complete: true,
            });
            if (!decoded || typeof decoded !== 'object') {
                throw new Error('Invalid Apple token format');
            }
            const decodedObj = decoded;
            if (!decodedObj.header || !decodedObj.header.kid) {
                throw new Error('Invalid Apple token format');
            }
            const jwksResponse = await fetch('https://appleid.apple.com/auth/keys');
            if (!jwksResponse.ok) {
                throw new Error('Failed to fetch Apple public keys');
            }
            const jwks = (await jwksResponse.json());
            const matchingKey = jwks.keys.find((k) => k.kid === decodedObj.header.kid);
            if (!matchingKey) {
                throw new Error('Matching Apple public key not found');
            }
            const publicKey = crypto.createPublicKey({
                format: 'jwk',
                key: matchingKey,
            });
            const pem = publicKey.export({ type: 'spki', format: 'pem' }).toString();
            const payload = await this.jwtService.verifyAsync(identityToken, {
                secret: pem,
                algorithms: ['RS256'],
            });
            if (payload.iss !== 'https://appleid.apple.com') {
                throw new Error('Apple token issuer mismatch');
            }
            const appleClientId = this.configService.get('APPLE_CLIENT_ID');
            if (appleClientId && payload.aud !== appleClientId) {
                throw new Error('Apple token client audience mismatch');
            }
            return {
                email: payload.email,
                providerId: payload.sub,
            };
        }
        catch {
            throw new common_1.UnauthorizedException('Invalid Apple identity token');
        }
    }
};
exports.SocialAuthService = SocialAuthService;
exports.SocialAuthService = SocialAuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        jwt_1.JwtService])
], SocialAuthService);
//# sourceMappingURL=social-auth.service.js.map