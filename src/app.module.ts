import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './modules/user/user.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UploadModule } from './modules/upload/upload.module'
import { AuthModule } from './modules/auth/auth.module'
// import ormConfig from '../ormconfig'
import envConfig from './config/envConfig'
import { ConfigModule, ConfigService } from '@nestjs/config' // ConfigService是
import { JwtAuthGuard } from './common/guard/jwt-auth.guard'
import { APP_GUARD } from '@nestjs/core'
import { RoleModule } from './modules/role/role.module';
import { PermissionModule } from './modules/permission/permission.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [envConfig.path],
    }),
    UserModule,
    // TypeOrmModule.forRoot(ormConfig),
    UploadModule,
    AuthModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST') ?? 'localhost',
        port: configService.get<number>('DB_PORT') ?? 3306,
        username: configService.get<string>('DB_USERNAME') ?? 'root',
        password: configService.get<string>('DB_PASSWORD') ?? '*******',
        database: configService.get<string>('DB_DATABASE') ?? 'yum',
        synchronize: true,
        retryDelay: 500,
        retryAttempts: 10,
        autoLoadEntities: true,
      }),
    }),
    RoleModule,
    PermissionModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
