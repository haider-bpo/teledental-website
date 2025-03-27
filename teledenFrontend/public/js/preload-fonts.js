// Preload critical fonts script
// This script helps with font loading optimization to prevent layout shifts

// Function to preload fonts
function preloadFonts() {
  const fontFiles = [
    "/assets/fonts/Exo-Regular.woff2",
    "/assets/fonts/Exo-Medium.woff2",
    "/assets/fonts/Exo-Bold.woff2",
    "/assets/fonts/Montserrat-Regular.woff2",
    "/assets/fonts/Montserrat-Medium.woff2",
    "/assets/fonts/Montserrat-SemiBold.woff2",
  ];

  // Create link elements for each font
  fontFiles.forEach((fontFile) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.href = fontFile;
    link.as = "font";
    link.type = "font/woff2";
    link.crossOrigin = "anonymous";

    // Add to document head
    document.head.appendChild(link);
  });
}

// Execute font preloading
preloadFonts();
