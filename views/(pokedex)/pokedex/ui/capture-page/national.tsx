import { getPokeSpriteSrc } from '@/entities/poke/model';
import { cn } from '@/shared/lib/cn';
import Image from 'next/image';

const data = [
  ['0001', '0002', '0003', '0003-mega', '0004', '0005'],
  ['0006', '0006-mega_x', '0006-mega_y', '0007', '0008', '0009'],
  ['0009-mega', '0010', '0011', '0012', '0013', '0014'],
  ['0015', '0015-mega', '0016', '0017', '0018', '0018-mega'],
  ['0019', '0019-alola', '0020', '0020-alola', '0021', '0022'],
  ['0023', '0024', '0025', '0026', '0026-alola', '0026-mega_x'],
];

export default function National() {
  const getSrc = (sprite: string) => {
    return getPokeSpriteSrc(sprite);
  };

  return (
    <div className="flex mx-auto w-5xl">
      {' '}
      <div className="flex flex-col gap-y-3 [mask-image:radial-gradient(ellipse_at_center,#000_35%,transparent_75%)]">
        {data.map((row, idx) => (
          <div key={idx} className="flex gap-x-3.5">
            {row.map((col, idx2) => (
              <div
                key={col}
                className={cn(
                  'bg-muted/70 rounded-2xl p-1.75',
                  idx % 2 === 1 && 'translate-x-6',
                  idx % 2 === 0 && '-translate-x-3',
                )}
              >
                <PokeSprite src={getSrc(col)} alt={col} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function PokeSprite({ src, alt }: { src: string; alt: string }) {
  return (
    <div className={cn('w-14 h-14 relative')}>
      <Image
        placeholder="blur"
        blurDataURL="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
        src={src}
        alt={alt}
        fill
        style={{
          objectFit: 'contain',
        }}
      />
    </div>
  );
}
