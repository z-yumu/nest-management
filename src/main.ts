import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
// import { VersioningType } from '@nestjs/common'


(async() => {
  const app = await NestFactory.create(AppModule)
  const options = new DocumentBuilder().setTitle('yum-docs').setDescription('apis-document').setVersion('1').build()
  const document = SwaggerModule.createDocument(app,options)
  SwaggerModule.setup('/api-docs',app,document)
  // 版本将在请求的 URI 中传递（默认）
  // app.enableVersioning({
  //   type: VersioningType.URI,
  // })
  await app.listen(8848)
})()
