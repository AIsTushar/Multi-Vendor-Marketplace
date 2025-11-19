import path from "path";
import fs from "fs";

const deleteFileFromFolder = async (fileUrl: string) => {
  try {
    // Extract the filename from the URL
    const filename = path.basename(new URL(fileUrl).pathname);
    const fullPath = path.join(process.cwd(), "uploads", filename);

    // console.log(filename, fullPath);

    await fs.promises.access(fullPath);
    await fs.promises.unlink(fullPath);
    // console.log(`Deleted file: ${filename}`);
  } catch (error) {
    console.error(`Failed to delete file: ${fileUrl}`, error);
  }
};

export const deleteFile = {
  deleteFileFromFolder,
};
