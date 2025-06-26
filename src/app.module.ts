import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import jwtConfig from './config/jwt.config';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    // Cấu hình ConfigModule
    ConfigModule.forRoot({
      isGlobal: true,
      load: [jwtConfig],
    }),

    // Cấu hình TypeORM với PostgreSQL (Neon Database)
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        // Cấu hình SSL cho Neon Database
        ssl: {
          rejectUnauthorized: false,
        },
        autoLoadEntities: true,
        synchronize: configService.get('NODE_ENV') === 'development',
        logging: true, // Hiển thị SQL queries trong console
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
