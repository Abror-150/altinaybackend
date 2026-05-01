import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import * as fs from 'fs';
import * as sharp from 'sharp';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('upload')
@ApiTags('Upload')
export class UploadController {
  @Post()
  @ApiOperation({ summary: 'Upload and compress a file' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const uploadPath = path.join(process.cwd(), 'images');

          if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
          }

          cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
          const uniqueName = `${Date.now()}${path.extname(file.originalname)}`;
          cb(null, uniqueName);
        },
      }),
    }),
  )
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      return { message: 'Fayl yuklanmadi' };
    }

    const baseName = path.parse(file.filename).name;
    const compressedFilename = `compressed-${baseName}.jpg`;
    const compressedPath = path.join(
      process.cwd(),
      'images',
      compressedFilename,
    );

    await sharp(file.path)
      .resize(1024)
      .jpeg({ quality: 70 })
      .toFile(compressedPath);

    const BASE_URL = 'http://138.2.146.136';

    return {
      original: `${BASE_URL}/images/${file.filename}`,
      compressed: `${BASE_URL}/images/${compressedFilename}`,
    };
  }
}
