import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { UserDocument } from '../schemas/user.schema';
export declare class AuthService {
    private userModel;
    private jwtService;
    constructor(userModel: Model<UserDocument>, jwtService: JwtService);
    register(email: string, password: string, fullName: string): Promise<{
        access_token: string;
        user: {
            id: string;
            email: string;
            fullName: string | null;
        };
    }>;
    login(email: string, password: string): Promise<{
        access_token: string;
        user: {
            id: string;
            email: string;
            fullName: string | null;
        };
    }>;
    getProfile(userId: string): Promise<{
        id: string;
        email: string;
        fullName: string | null;
    }>;
    private buildAuthResponse;
    private toPublicUser;
}
