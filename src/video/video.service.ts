import { Injectable } from '@nestjs/common';
import { existsSync, mkdirSync } from 'fs';

@Injectable()
export class VideoService {
  constructor() {
    if (!existsSync('./uploads/videos')) {
      mkdirSync('./uploads/videos', { recursive: true });
    }
  }

  uploadVideo(file: Express.Multer.File) {
    const url = `${process.env.BASE_URL}/uploads/videos/${file.filename}`;
    return { url };
  }
}
