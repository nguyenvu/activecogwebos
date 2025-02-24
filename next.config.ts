import type { NextConfig } from "next";

// next.config.js
module.exports = {
  async headers() {
    return [
      {
        // specifying /(.*) in the source sets security headers on all routes
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; font-src 'self' https://fonts.googleapis.com; img-src 'self' *.api.radio-browser.info; script-src 'self'",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(); battery=(); geolocation=(); microphone=()",
          },
        ],
      },
    ];
  },
};
