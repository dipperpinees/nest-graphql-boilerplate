import { Injectable, NotAcceptableException } from '@nestjs/common';
import { FileUpload } from 'graphql-upload';
import { v2 } from 'cloudinary';

@Injectable()
export class CloudinaryService {
    async uploadSingleImage ({createReadStream, mimetype}: FileUpload): Promise<any> {
        if(!mimetype.includes('image')) throw new NotAcceptableException('Image file required')
        const stream = await createReadStream();
        return await new Promise((resolve, reject) => {
            const upload = v2.uploader.upload_stream((error, result) => {
              if (error) return reject(error);
              resolve(result);
            });
            stream.pipe(upload);
        });
    }
}