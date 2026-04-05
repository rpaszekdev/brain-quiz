import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Brain Atlas — Interactive 3D Brain Quiz';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #F5F2EB 0%, #EDE8DC 50%, #E5DFD0 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Georgia, serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '24px',
          }}
        >
          <div style={{ fontSize: 96, lineHeight: 1 }}>脳</div>
          <div
            style={{
              fontSize: 56,
              fontWeight: 700,
              color: '#1A1A1A',
              letterSpacing: '-1px',
            }}
          >
            Brain Atlas
          </div>
          <div
            style={{
              fontSize: 24,
              color: '#6B6B6B',
              maxWidth: 600,
              textAlign: 'center',
              lineHeight: 1.4,
            }}
          >
            Interactive 3D brain quiz with 50+ regions
          </div>
          <div
            style={{
              display: 'flex',
              gap: '16px',
              marginTop: '16px',
            }}
          >
            {['Explore', 'Identify', 'Locate'].map((label) => (
              <div
                key={label}
                style={{
                  padding: '8px 24px',
                  borderRadius: '6px',
                  border: '1.5px solid #264E70',
                  color: '#264E70',
                  fontSize: 18,
                }}
              >
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
