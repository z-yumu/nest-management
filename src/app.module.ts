import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './modules/user/user.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UploadModule } from './modules/upload/upload.module'
import { AuthModule } from './modules/auth/auth.module'
import ormConfig from '../ormconfig'
import envConfig from './config/envConfig'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [envConfig.path],
    }),
    UserModule,
    TypeOrmModule.forRoot(ormConfig),
    UploadModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
