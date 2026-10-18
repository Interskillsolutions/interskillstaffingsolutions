import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

let cloudName = (process.env.CLOUDINARY_CLOUD_NAME || 'dh88i5t2l').trim();
// Auto-correct common typo where lowercase 'l' was typed as digit '1'
if (cloudName === 'dh88i5t21') {
  cloudName = 'dh88i5t2l';
}

cloudinary.config({
  cloud_name: cloudName,
  api_key: (process.env.CLOUDINARY_API_KEY || '128382793655217').trim(),
  api_secret: (process.env.CLOUDINARY_API_SECRET || 'ffrKdlx1x-PR8WJh8phwE55B19s').trim(),
  secure: true,
});

export default cloudinary;
