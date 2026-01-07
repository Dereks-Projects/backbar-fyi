import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Countries to block
const BLOCKED_COUNTRIES = ['CN', 'RU']

export function middleware(request: NextRequest) {
  // Get country from Vercel's header (more reliable than request.geo)
  const country = request.headers.get('x-vercel-ip-country') || ''

  // Check if country is blocked
  if (BLOCKED_COUNTRIES.includes(country)) {
    // Return a styled blocked response
    return new NextResponse(
      `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Access Restricted | BACKBAR</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body {
              font-family: 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif;
              background-color: #002228;
              color: #ffffff;
              min-height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
              text-align: center;
              padding: 20px;
            }
            .container { max-width: 500px; }
            h1 { 
              font-size: 32px; 
              margin-bottom: 16px;
              color: #c9a227;
            }
            p { 
              font-size: 16px; 
              opacity: 0.9; 
              line-height: 1.6; 
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Access Restricted</h1>
            <p>BACKBAR is not available in your region.</p>
          </div>
        </body>
      </html>
      `,
      {
        status: 403,
        headers: {
          'Content-Type': 'text/html',
        },
      }
    )
  }

  // Allow request to continue
  return NextResponse.next()
}

// Run middleware on all routes except static files
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.svg$).*)',
  ],
}