// Image Lazy Loader Script
// This script implements lazy loading for images and converts them to WebP format when supported

document.addEventListener("DOMContentLoaded", function () {
  // Check for WebP support
  function checkWebpSupport(callback) {
    const webpImg = new Image();
    webpImg.onload = function () {
      callback(webpImg.height === 2);
    };
    webpImg.onerror = function () {
      callback(false);
    };
    webpImg.src =
      "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
  }

  // Initialize Intersection Observer for lazy loading
  const lazyImageObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const lazyImage = entry.target;
          const src = lazyImage.dataset.src;

          if (src) {
            // Set the src attribute to load the image
            lazyImage.src = src;
            lazyImage.removeAttribute("data-src");

            // If it has srcset, load that too
            if (lazyImage.dataset.srcset) {
              lazyImage.srcset = lazyImage.dataset.srcset;
              lazyImage.removeAttribute("data-srcset");
            }

            lazyImage.classList.remove("lazy");
            observer.unobserve(lazyImage);
          }
        }
      });
    },
    {
      rootMargin: "200px 0px",
      threshold: 0.01,
    }
  );

  // Find all images with class 'lazy' and observe them
  const lazyImages = document.querySelectorAll("img.lazy");
  lazyImages.forEach((img) => {
    lazyImageObserver.observe(img);
  });

  // Convert image paths to WebP when supported
  checkWebpSupport(function (hasWebpSupport) {
    if (hasWebpSupport) {
      // Find all background images and convert them to WebP if possible
      const elementsWithBgImage = document.querySelectorAll("[data-bg-webp]");
      elementsWithBgImage.forEach((el) => {
        const webpPath = el.getAttribute("data-bg-webp");
        if (webpPath) {
          el.style.backgroundImage = `url(${webpPath})`;
        }
      });
    }
  });
});
