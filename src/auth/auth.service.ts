import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async register(email: string, password: string, fullName: string) {
    const normalizedEmail = email.trim().toLowerCase();
    const existing = await this.userModel.findOne({ email: normalizedEmail });
    if (existing) {
      throw new ConflictException('An account with this email already exists');
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await this.userModel.create({
      email: normalizedEmail,
      passwordHash,
      fullName: fullName.trim(),
    });

    return this.buildAuthResponse(user);
  }

  async login(email: string, password: string) {
    const normalizedEmail = email.trim().toLowerCase();
    const user = await this.userModel.findOne({ email: normalizedEmail });
    if (!user || !user.passwordHash) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return this.buildAuthResponse(user);
  }

  async getProfile(userId: string) {
    const user = await this.userModel.findById(userId).select('-passwordHash');
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return this.toPublicUser(user);
  }

  async validateSocialLogin(
    provider: string,
    email: string,
    providerId: string,
    fullName?: string,
  ) {
    const normalizedEmail = email.trim().toLowerCase();
    let user = await this.userModel.findOne({ email: normalizedEmail });

    if (user) {
      // Link account if not already linked
      if (!user.provider || !user.providerId) {
        user.provider = provider;
        user.providerId = providerId;
        if (fullName && !user.fullName) {
          user.fullName = fullName.trim();
        }
        await user.save();
      }
    } else {
      // Provision a new user for social login
      user = await this.userModel.create({
        email: normalizedEmail,
        fullName: fullName ? fullName.trim() : undefined,
        provider,
        providerId,
      });
    }

    return this.buildAuthResponse(user);
  }

  async refreshTokens(refreshToken: string) {
    try {
      const payload = await this.jwtService.verifyAsync<{
        sub: string;
        email: string;
      }>(refreshToken);
      const userId = payload.sub;

      const user = await this.userModel.findById(userId);
      if (!user || !user.hashedRefreshToken) {
        throw new UnauthorizedException('Access Denied');
      }

      const hashedIncoming = crypto
        .createHash('sha256')
        .update(refreshToken)
        .digest('hex');

      const matches = hashedIncoming === user.hashedRefreshToken;
      if (!matches) {
        throw new UnauthorizedException('Access Denied');
      }

      return this.buildAuthResponse(user);
    } catch {
      throw new UnauthorizedException('Access Denied');
    }
  }

  async logout(userId: string) {
    await this.userModel.updateOne(
      { _id: userId },
      { $unset: { hashedRefreshToken: 1 } },
    );
  }

  private async buildAuthResponse(user: UserDocument) {
    const publicUser = this.toPublicUser(user);
    const payload = {
      sub: user._id.toString(),
      email: user.email,
    };

    const access_token = this.jwtService.sign(payload, {
      expiresIn: '15m',
    });

    const refresh_token = this.jwtService.sign(
      {
        ...payload,
        nonce: Math.random().toString(36).substring(2, 15),
      },
      {
        expiresIn: '7d',
      },
    );

    const hashedRefreshToken = crypto
      .createHash('sha256')
      .update(refresh_token)
      .digest('hex');

    await this.userModel.updateOne({ _id: user._id }, { hashedRefreshToken });

    return {
      access_token,
      refresh_token,
      user: publicUser,
    };
  }

  private toPublicUser(user: UserDocument) {
    return {
      id: user._id.toString(),
      email: user.email,
      fullName: user.fullName ?? null,
    };
  }
}
