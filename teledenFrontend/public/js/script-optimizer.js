// Script Optimizer
// This script helps optimize JavaScript loading and execution

document.addEventListener("DOMContentLoaded", function () {
  // Function to load scripts dynamically
  function loadScriptDynamically(src, async = true, defer = true) {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      if (async) script.async = true;
      if (defer) script.defer = true;

      script.onload = () => resolve(script);
      script.onerror = () => reject(new Error(`Script load error for ${src}`));

      document.body.appendChild(script);
    });
  }

  // Load non-critical third-party scripts after page load
  // This helps improve initial page load performance
  setTimeout(() => {
    // Add any third-party scripts that aren't critical for initial render
    // For example, analytics, chat widgets, etc.

    // Example: Load Dialogflow script dynamically if it's not already loaded
    if (!document.querySelector('script[src*="dialogflow-console"]')) {
      loadScriptDynamically(
        "https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/df-messenger.js"
      )
        .then(() => console.log("Dialogflow script loaded successfully"))
        .catch((err) => console.error("Error loading Dialogflow script:", err));
    }
  }, 2000); // 2 second delay after DOMContentLoaded
});
