import { Injectable } from '@nestjs/common';
import { existsSync, mkdirSync } from 'fs';
import { exec } from 'child_process';
import { extname, join } from 'path';

@Injectable()
export class VideoService {
  constructor() {
    if (!existsSync('./uploads/videos')) {
      mkdirSync('./uploads/videos', { recursive: true });
    }
  }

  uploadVideo(file: Express.Multer.File): Promise<{ url: string }> {
    return new Promise((resolve, reject) => {
      const ext = extname(file.filename).toLowerCase();

      if (ext === '.mp4') {
        const url = `${process.env.BASE_URL}/uploads/videos/${file.filename}`;
        return resolve({ url });
      }

      const newFilename = file.filename.replace(/\.[^.]+$/, '.mp4');
      const inputPath = join(process.cwd(), 'uploads/videos', file.filename);
      const outputPath = join(process.cwd(), 'uploads/videos', newFilename);

      exec(
        `ffmpeg -i ${inputPath} -vcodec h264 -acodec aac ${outputPath}`,
        (error) => {
          if (error) return reject(error);
          exec(`rm ${inputPath}`);
          const url = `${process.env.BASE_URL}/uploads/videos/${newFilename}`;
          resolve({ url });
        },
      );
    });
  }
}
