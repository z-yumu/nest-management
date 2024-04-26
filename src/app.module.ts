import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './user/user.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UploadModule } from './upload/upload.module'
import ormConfig from '../ormconfig'

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot(ormConfig),
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
