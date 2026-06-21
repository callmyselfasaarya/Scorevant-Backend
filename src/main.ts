import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());

  const configService = app.get(ConfigService);
  const frontendUrl = configService.get<string>('FRONTEND_URL');
  const allowedOrigins = ['http://localhost:5173', 'http://127.0.0.1:5173'];
  if (frontendUrl) {
    const cleanUrl = frontendUrl.replace(/\/$/, '');
    allowedOrigins.push(cleanUrl);
    if (cleanUrl.includes('vercel.app')) {
      allowedOrigins.push(cleanUrl.replace('://', '://www.'));
    }
  }

  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  const port = process.env.PORT || 3000;
  await app.listen(port);
}
bootstrap().catch((err) => {
  console.error('Error during bootstrap:', err);
});
