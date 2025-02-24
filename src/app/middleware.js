export function middleware(request: NextRequest) {
    const nonce = Buffer.from(crypto.randomUUID()).toString("base64");

    const csp = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
    style-src 'self' 'nonce-${nonce}';
    `;
     const cspValue = csp.replace(/\s{2,}/g, " ").trim();

    const reqHeaders = new Headers(request.headers);

    reqHeaders.set("X-Nonce", nonce);
    reqHeaders.set("Content-Security-Policy", cspValue);

    const response= NextResponse.next({
        request: {
             headers: reqHeaders
        }
    });

    response.headers.set("Content-Security-Policy", cspValue);

    return response;
}


// We also don't include csp header when retrieving static assets.

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
}
