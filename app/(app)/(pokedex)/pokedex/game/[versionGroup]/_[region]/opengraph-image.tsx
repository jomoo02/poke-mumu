import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import { getRegionalDex } from '@/views/pokedex-game-version-group-region/api';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = '포케무무 도감';

export default async function OgImage({
  params,
}: {
  params: Promise<{ versionGroup: string; region: string }>;
}) {
  const { versionGroup, region } = await params;
  const dex = await getRegionalDex(versionGroup, region);

  const [fontBold, fontMedium] = await Promise.all([
    readFile(join(process.cwd(), 'public/fonts/EliceDXNeolli-Bold.ttf')),
    readFile(join(process.cwd(), 'public/fonts/EliceDXNeolli-Medium.ttf')),
  ]);

  const versionGroupKo = dex?.versionGroupKo ?? '';
  const regionKo = dex?.regionKo ?? '';
  const count = dex?.entries.length ?? 0;
  const heading = regionKo ? `${regionKo} 도감` : '포켓몬 도감';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '90px',
          backgroundColor: '#ffffff',
          fontFamily: 'Elice',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 36,
            fontWeight: 500,
            color: '#9ca3af',
            marginBottom: 28,
          }}
        >
          포케무무
        </div>
        {versionGroupKo && (
          <div
            style={{
              display: 'flex',
              fontSize: 48,
              fontWeight: 500,
              color: '#4b5563',
              marginBottom: 10,
            }}
          >
            {versionGroupKo}
          </div>
        )}
        <div
          style={{
            display: 'flex',
            fontSize: 104,
            fontWeight: 700,
            color: '#111827',
            lineHeight: 1.1,
          }}
        >
          {heading}
        </div>
        {count > 0 && (
          <div
            style={{
              display: 'flex',
              fontSize: 38,
              fontWeight: 500,
              color: '#9ca3af',
              marginTop: 36,
            }}
          >
            총 {count}종
          </div>
        )}
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Elice', data: fontBold, weight: 700, style: 'normal' },
        { name: 'Elice', data: fontMedium, weight: 500, style: 'normal' },
      ],
    },
  );
}
