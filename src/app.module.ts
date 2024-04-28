import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './modules/user/user.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UploadModule } from './modules/upload/upload.module'
import { AuthModule } from './modules/auth/auth.module'
import ormConfig from '../ormconfig'

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot(ormConfig),
    UploadModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
