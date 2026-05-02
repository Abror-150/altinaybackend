import { Injectable } from '@nestjs/common';

@Injectable()
export class VideoService {
  getVideoUrl(req: any, filename: string): string {
    return `${req.protocol}://${req.get('host')}/uploads/videos/${filename}`;
  }
}
