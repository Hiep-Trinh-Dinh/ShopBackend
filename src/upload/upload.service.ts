import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { v2 as Cloudinary, UploadApiResponse } from 'cloudinary';
import { Readable } from 'stream';
import { File } from 'multer';

@Injectable()
export class UploadService {
  constructor(@Inject('CLOUDINARY') private cloudinary: typeof Cloudinary) {}

  async uploadImage(file: File): Promise<UploadApiResponse> {
    if (!file || !file.buffer) {
      throw new BadRequestException('No files were uploaded.');
    }

    if (!file.mimetype.startsWith('image/')) {
      throw new BadRequestException('File is not a valid image');
    }

    return new Promise((resolve, reject) => {
      const uploadStream = this.cloudinary.uploader.upload_stream(
        {
          folder: 'e-commerce',
          public_id: file.originalname.split('.').slice(0, -1).join(''),
          resource_type: 'image',
          overwrite: true,
        },
        (error, result) => {
          if (error) {
            return reject(
              new BadRequestException('Unable to upload images to Cloudinary'),
            );
          }
          if (!result) {
            return reject(
              new BadRequestException('No upload results received'),
            );
          }
          resolve(result);
        },
      );

      Readable.from(file.buffer).pipe(uploadStream);
    });
  }
}
