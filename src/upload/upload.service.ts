import { Injectable, Inject } from '@nestjs/common';
import { v2 as Cloudinary, UploadApiResponse } from 'cloudinary';
import { Readable } from 'stream';

@Injectable()
export class UploadService {
  constructor(@Inject('CLOUDINARY') private cloudinary: typeof Cloudinary) {}

  async uploadImage(
    buffer: Buffer,
    filename: string,
  ): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const uploadStream = this.cloudinary.uploader.upload_stream(
        {
          folder: 'e-commerce',
          public_id: filename,
        },
        (error, result) => {
          if (error) return reject(error);
          return resolve(result);
        },
      );

      const stream = Readable.from(buffer);
      stream.pipe(uploadStream);
    });
  }
}
