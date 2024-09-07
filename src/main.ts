import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'
import { TransformInterceptor } from './common/transform.interceptor'
import { HttpExceptionFilter } from './common/http-exception.filter'

import { join } from 'path'
import * as session from 'express-session'
;import { NestExpressApplication } from '@nestjs/platform-express'
(async () => {
  // const app = await NestFactory.create(AppModule)
  
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.use(
    session({
      secret: 'Rich_J',
      name: 'rj.session',
      rolling: true,
      cookie: { maxAge: null },
    }),
  )
  const options = new DocumentBuilder()
    .setTitle('yum-docs')
    .setDescription('apis-document')
    .setVersion('1')
    .addBearerAuth() // Add authentication
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('/api-docs', app, document)
  // Version will be passed in the requested URI (default)
  // app.enableVersioning({
  //   type: VersioningType.URI,
  // })

  // static pics
  app.useStaticAssets(join(__dirname, 'images'), {
    prefix: '/xiaoyu',
  })
  app.useGlobalFilters(new HttpExceptionFilter()) // Exception return format
  app.useGlobalInterceptors(new TransformInterceptor()) // Successfully returned format
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, 
    }),
  )
  await app.listen(8848)
})()
