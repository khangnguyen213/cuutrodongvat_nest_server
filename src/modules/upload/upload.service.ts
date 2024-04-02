import { Injectable } from '@nestjs/common';
import { writeFileSync } from 'fs';
import { join } from 'path';

@Injectable()
export class UploadService {
  uploadFile(file: Express.Multer.File, prefix?: string) {
    // let fileName = `img_${Date.now()}_${Math.ceil(Math.random() * 10000)}.${file.mimetype.split('/')[1]}`;
    // writeFileSync(join(__dirname, '../../../public/' + fileName), file.buffer);
    // return `http://localhost:3000/${fileName}`;
    try {
      let fileName = `${prefix || 'image'}_${Date.now()}_${Math.ceil(Math.random() * 10000)}.${file.mimetype.split('/')[1]}`;
      writeFileSync(
        join(__dirname, '../../../public/' + fileName),
        file.buffer,
      );
      return `${process.env.SERVER_URL}/${fileName}`;
    } catch (error) {
      throw error;
    }
  }
}
