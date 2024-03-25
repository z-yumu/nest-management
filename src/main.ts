import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'
import { TransformInterceptor } from './common/transform.interceptor'
import { HttpExceptionFilter } from './common/http-exception.filter'
import * as session from 'express-session'


(async() => {
  const app = await NestFactory.create(AppModule)
  app.use(session({ secret: "Rich_J", name: "rj.session", rolling: true, cookie: { maxAge: null } }))
  const options = new DocumentBuilder().setTitle('yum-docs').setDescription('apis-document').setVersion('1').build()
  const document = SwaggerModule.createDocument(app,options)
  SwaggerModule.setup('/api-docs',app,document)
  // 版本将在请求的 URI 中传递（默认）
  // app.enableVersioning({
  //   type: VersioningType.URI,
  // })
  app.useGlobalFilters(new HttpExceptionFilter()) // 异常返回格式
  app.useGlobalInterceptors(new TransformInterceptor()) // 成功返回格式
  app.useGlobalPipes(new ValidationPipe({
    transform: true // 开启转换
  }))
  await app.listen(8848)
})()


