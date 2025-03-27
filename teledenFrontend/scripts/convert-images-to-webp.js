/**
 * Image Conversion Script
 * This script converts images to WebP format and optimizes them
 *
 * Usage:
 * 1. Install required dependencies: npm install sharp glob fs-extra
 * 2. Run: node convert-images-to-webp.js
 */

const sharp = require("sharp");
const glob = require("glob");
const fs = require("fs-extra");
const path = require("path");

// Configuration
const config = {
  // Source directories to scan for images
  sourceDirs: ["./public/assets/img", "./src/assets/img"],
  // Image extensions to convert
  extensions: ["jpg", "jpeg", "png"],
  // Quality setting for WebP (0-100)
  quality: 80,
  // Whether to resize large images
  resizeImages: true,
  // Maximum dimensions for resized images
  maxWidth: 1600,
  maxHeight: 1600,
};

// Function to convert a single image to WebP
async function convertToWebP(imagePath) {
  try {
    const outputPath = imagePath.replace(/\.(jpg|jpeg|png)$/i, ".webp");

    // Skip if WebP version already exists and is newer
    if (fs.existsSync(outputPath)) {
      const originalStat = fs.statSync(imagePath);
      const webpStat = fs.statSync(outputPath);

      if (webpStat.mtimeMs > originalStat.mtimeMs) {
        console.log(`Skipping ${imagePath} (WebP already up to date)`);
        return;
      }
    }

    // Get image metadata
    const metadata = await sharp(imagePath).metadata();

    // Initialize sharp instance
    let sharpInstance = sharp(imagePath);

    // Resize large images if enabled
    if (
      config.resizeImages &&
      (metadata.width > config.maxWidth || metadata.height > config.maxHeight)
    ) {
      sharpInstance = sharpInstance.resize({
        width: Math.min(metadata.width, config.maxWidth),
        height: Math.min(metadata.height, config.maxHeight),
        fit: "inside",
        withoutEnlargement: true,
      });
    }

    // Convert to WebP
    await sharpInstance.webp({ quality: config.quality }).toFile(outputPath);

    // Get file sizes for comparison
    const originalSize = fs.statSync(imagePath).size;
    const webpSize = fs.statSync(outputPath).size;
    const savings = (((originalSize - webpSize) / originalSize) * 100).toFixed(
      2
    );

    console.log(`Converted ${imagePath} to WebP (${savings}% smaller)`);
  } catch (error) {
    console.error(`Error converting ${imagePath}:`, error);
  }
}

// Main function
async function main() {
  let totalImages = 0;

  // Process each source directory
  for (const sourceDir of config.sourceDirs) {
    // Create pattern for glob
    const pattern = `${sourceDir}/**/*.{${config.extensions.join(",")}}`;

    // Find all matching images
    const images = glob.sync(pattern);
    totalImages += images.length;

    console.log(`Found ${images.length} images in ${sourceDir}`);

    // Convert each image
    for (const imagePath of images) {
      await convertToWebP(imagePath);
    }
  }

  console.log(`Conversion complete. Processed ${totalImages} images.`);
}

// Run the script
main().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});
