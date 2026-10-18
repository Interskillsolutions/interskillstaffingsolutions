import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import cloudinary from '../config/cloudinary.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Base directory for local disk uploads
const baseUploadsDir = path.join(__dirname, '..', 'uploads');

// Ensure directories exist on startup
export const ensureUploadDirectories = () => {
  const dirs = [
    baseUploadsDir,
    path.join(baseUploadsDir, 'resumes'),
    path.join(baseUploadsDir, 'images'),
  ];
  dirs.forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
};

ensureUploadDirectories();

/**
 * Universal file storage handler:
 * Saves directly to VPS local disk by default (100% free, private, no third-party accounts required).
 * If Cloudinary is explicitly configured with valid credentials in .env, it can use Cloudinary.
 */
export const saveUploadedFile = async (file, folder = 'resumes', req = null) => {
  if (!file) {
    return { url: '', fileName: '' };
  }

  const originalName = file.originalname || 'document.pdf';
  const cleanBase = originalName.replace(/[^a-zA-Z0-9._-]/g, '_');
  const uniqueFileName = `${Date.now()}-${cleanBase}`;

  // Check if Cloudinary is explicitly configured
  const hasCloudinary =
    process.env.STORAGE_DRIVER !== 'local' &&
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET &&
    process.env.CLOUDINARY_CLOUD_NAME !== 'your_cloud_name' &&
    process.env.CLOUDINARY_API_KEY !== 'your_api_key';

  if (hasCloudinary) {
    try {
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: `interskill/${folder}`,
            resource_type: 'auto',
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(file.buffer);
      });

      return {
        url: uploadResult.secure_url,
        fileName: originalName,
      };
    } catch (err) {
      console.warn('Cloudinary upload error, storing directly on VPS disk instead:', err.message);
    }
  }

  // Direct VPS Local Disk Storage
  const targetDir = path.join(baseUploadsDir, folder);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const filePath = path.join(targetDir, uniqueFileName);
  await fs.promises.writeFile(filePath, file.buffer);

  // Build full accessible URL if request object is available, or relative path
  let fileUrl = `/uploads/${folder}/${uniqueFileName}`;
  if (req) {
    const protocol = req.headers['x-forwarded-proto'] || req.protocol || 'http';
    const host = req.get('host');
    if (host) {
      fileUrl = `${protocol}://${host}/uploads/${folder}/${uniqueFileName}`;
    }
  }

  return {
    url: fileUrl,
    fileName: originalName,
  };
};
