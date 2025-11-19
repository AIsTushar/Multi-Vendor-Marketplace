// import multer from "multer";
// import { v2 as cloudinary } from "cloudinary";
// import streamifier from "streamifier";
// import fileFilter from "./fileFilter";

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
//   api_key: process.env.CLOUDINARY_API_KEY!,
//   api_secret: process.env.CLOUDINARY_API_SECRET!,
// });

// // Multer using memory storage (file stored in RAM, not disk)
// const upload = multer({
//   storage: multer.memoryStorage(),
//   fileFilter,
//   limits: { fileSize: 1024 * 1024 * 5 }, // 5MB
// });

// // ---- Helper to upload to Cloudinary ----
// export const uploadToCloudinary = (
//   file: Express.Multer.File,
//   folder: string = "uploads"
// ): Promise<any> => {
//   return new Promise((resolve, reject) => {
//     const uploadStream = cloudinary.uploader.upload_stream(
//       {
//         folder,
//         public_id: `${Date.now()}-${file.originalname}`,
//       },
//       (error, result) => {
//         if (error) return reject(error);
//         resolve(result);
//       }
//     );

//     // Convert buffer → stream
//     streamifier.createReadStream(file.buffer).pipe(uploadStream);
//   });
// };

// // ---- Single file upload → returns URL ----
// export const getImageUrl = async (file: Express.Multer.File) => {
//   if (!file) return null;
//   const result = await uploadToCloudinary(file);
//   return result.secure_url;
// };

// // ---- Multiple file upload → returns URL list ----
// export const getImageUrls = async (files: Express.Multer.File[]) => {
//   if (!files?.length) return [];
//   const uploads = files.map((file) => uploadToCloudinary(file));
//   const results = await Promise.all(uploads);
//   return results.map((r) => r.secure_url);
// };

// // ---- Delete from Cloudinary ----
// export const deleteFromCloudinary = async (url: string) => {
//   const publicId = decodeURIComponent(url).split("/").pop()?.split(".")[0];
//   if (!publicId) throw new Error("Invalid Cloudinary URL");

//   await cloudinary.uploader.destroy(`uploads/${publicId}`);
// };

// // ---- Middleware exports ----
// export const uploadProfileImage = upload.single("profileImage");
// export const uploadMultipleImages = upload.array("images", 10);
