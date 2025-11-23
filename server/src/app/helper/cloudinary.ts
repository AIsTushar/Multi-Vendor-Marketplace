import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import fileFilter from "./fileFilter";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

// Multer using memory storage (file stored in RAM, not disk)
const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5MB
});

// ---- Helper to upload to Cloudinary ----
export const uploadToCloudinary = (
  file: Express.Multer.File,
  folder: string = "uploads"
): Promise<any> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        public_id: `${Date.now()}-${file.originalname}`,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    // Convert buffer → stream
    streamifier.createReadStream(file.buffer).pipe(uploadStream);
  });
};

// ---- Single file upload → returns URL ----
export const getImageUrl = async (file: Express.Multer.File) => {
  if (!file) return null;
  const result = await uploadToCloudinary(file);
  return result.secure_url;
};

// ---- Multiple file upload → returns URL list ----
export const getImageUrls = async (files: Express.Multer.File[]) => {
  if (!files?.length) return [];
  const uploads = files.map((file) => uploadToCloudinary(file));
  const results = await Promise.all(uploads);
  return results.map((r) => r.secure_url);
};

// ---- Delete from Cloudinary ----
export const deleteFromCloudinary = async (url: string) => {
  const decoded = decodeURIComponent(url);

  const withoutExt = decoded.replace(/\.[^/.]+$/, "");
  const parts = withoutExt.split("/");

  const sysIndex = parts.findIndex((p) => p === "upload");

  if (sysIndex === -1) {
    throw new Error("Could not find Cloudinary upload segment");
  }

  const publicId = parts.slice(sysIndex + 2).join("/");
  const result = await cloudinary.uploader.destroy(publicId);

  return result;
};

export const deleteManyFromCloudinary = async (urls: string[]) => {
  return Promise.all(
    urls.map(async (url) => {
      try {
        const decoded = decodeURIComponent(url);
        const withoutExt = decoded.replace(/\.[^/.]+$/, "");
        const parts = withoutExt.split("/");
        const uploadIndex = parts.findIndex((p) => p === "upload");

        if (uploadIndex === -1) {
          throw new Error("Upload segment not found");
        }

        const publicId = parts.slice(uploadIndex + 2).join("/");

        if (!publicId) {
          throw new Error("Invalid publicId");
        }

        const result = await cloudinary.uploader.destroy(publicId);
        return { url, result };
      } catch (error: any) {
        return { url, error: error.message };
      }
    })
  );
};

// ---- Middleware exports ----
export const uploadSingleImage = upload.single("image");
export const uploadSingleFile = upload.single("file");
export const uploadMultipleImages = upload.array("images", 3);
export const uploadImageAndFile = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "file", maxCount: 1 },
]);
