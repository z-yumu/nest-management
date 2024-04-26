import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Res,
} from '@nestjs/common'
import { UploadService } from './upload.service'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiTags } from '@nestjs/swagger'
import { join } from 'path'
import { zip } from 'compressing'

import type { Response } from 'express'

@Controller('upload')
@ApiTags('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}
  @Post('album')
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file) {
    console.log(file, '=================>ggg')
    return true
  }

  @Post('stream')
  async down(@Res() res: Response) {
    const url = join(__dirname, '../images/1714098177960.jpeg')
    const tarStream = new zip.Stream()
    await tarStream.addEntry(url)

    res.setHeader('Content-Type', 'application/octet-stream')
    res.setHeader('Content-Disposition', `attachment; filename=xiaoyu`)

    tarStream.pipe(res)
  }
}
