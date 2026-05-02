import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { PrismaModule } from './prisma/prisma.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { UploadController } from './upload/upload.controller';
import { TelegramModule } from './telegram/telegram.module';
import { ContactModule } from './contact/contact.module';
import { VideoModule } from './video/video.module';

@Module({
  imports: [ProductModule, OrderModule, TelegramModule, ContactModule, VideoModule],
  controllers: [AppController, UploadController],
  providers: [AppService],
})
export class AppModule {}
