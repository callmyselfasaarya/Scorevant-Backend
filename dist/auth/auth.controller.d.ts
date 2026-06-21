import { AuthService } from './auth.service';
import { SocialAuthService } from './social-auth.service';
export declare class AuthController {
    private readonly authService;
    private readonly socialAuthService;
    constructor(authService: AuthService, socialAuthService: SocialAuthService);
    register(body: {
        email: string;
        password: string;
        fullName: string;
    }): Promise<{
        access_token: string;
        refresh_token: string;
        user: {
            id: string;
            email: string;
            fullName: string | null;
        };
    }>;
    login(body: {
        email: string;
        password: string;
    }): Promise<{
        access_token: string;
        refresh_token: string;
        user: {
            id: string;
            email: string;
            fullName: string | null;
        };
    }>;
    googleLogin(body: {
        idToken: string;
    }): Promise<{
        access_token: string;
        refresh_token: string;
        user: {
            id: string;
            email: string;
            fullName: string | null;
        };
    }>;
    facebookLogin(body: {
        accessToken: string;
    }): Promise<{
        access_token: string;
        refresh_token: string;
        user: {
            id: string;
            email: string;
            fullName: string | null;
        };
    }>;
    appleLogin(body: {
        identityToken: string;
    }): Promise<{
        access_token: string;
        refresh_token: string;
        user: {
            id: string;
            email: string;
            fullName: string | null;
        };
    }>;
    refresh(body: {
        refreshToken: string;
    }): Promise<{
        access_token: string;
        refresh_token: string;
        user: {
            id: string;
            email: string;
            fullName: string | null;
        };
    }>;
    logout(req: {
        user: {
            userId: string;
        };
    }): Promise<{
        message: string;
    }>;
    me(req: {
        user: {
            userId: string;
        };
    }): Promise<{
        id: string;
        email: string;
        fullName: string | null;
    }>;
}
