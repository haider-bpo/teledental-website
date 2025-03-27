// CSS Loader Script
// This script loads CSS files asynchronously to prevent render-blocking

// Function to load CSS asynchronously
function loadCSS(href, media = "all") {
  // Create link element
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  link.media = "print";
  link.setAttribute("onload", "this.media='" + media + "'");

  // Add to document head
  document.head.appendChild(link);

  // Return the link element
  return link;
}

// Load non-critical CSS files asynchronously
document.addEventListener("DOMContentLoaded", function () {
  // Bootstrap CSS
  loadCSS(
    "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
  );

  // Font Awesome
  loadCSS(
    "https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
  );

  // Swiper CSS
  loadCSS("https://unpkg.com/swiper/swiper-bundle.min.css");

  // Google Fonts - load with display=swap for better performance
  loadCSS(
    "https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,200..1000;1,200..1000&family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap"
  );
});
