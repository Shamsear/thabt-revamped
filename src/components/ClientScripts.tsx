"use client";

import Script from "next/script";

export function ClientScripts() {
  return (
    <>
      {/* GLightbox JS for Video Modal */}
      <Script
        src="https://cdn.jsdelivr.net/npm/glightbox/dist/js/glightbox.min.js"
        strategy="afterInteractive"
        onLoad={() => {
          // @ts-ignore
          if (typeof GLightbox !== "undefined") {
            // @ts-ignore
            GLightbox({ selector: ".glightbox" });
          }
        }}
      />
    </>
  );
}
