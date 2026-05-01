import { ImageResponse } from 'next/og'

// Next.js 16 app icon — generates a 32x32 PNG favicon dynamically from JSX.
// See: node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/01-metadata/app-icons.md

export const size = {
  width: 32,
  height: 32,
}

export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0a0a0f',
          borderRadius: 7,
          border: '1.5px solid #6366f1',
          boxSizing: 'border-box',
        }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="icon-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="55%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
          <g
            fill="none"
            stroke="url(#icon-grad)"
            strokeWidth="3.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 8 L25 8" />
            <path d="M24 9 L8 23" />
            <path d="M7 23 L25 23" />
          </g>
        </svg>
      </div>
    ),
    {
      ...size,
    }
  )
}
