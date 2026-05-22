import Link from 'next/link';
import { parseDisplay } from '../lib/parse-display';
import type { RefResolvers } from '../lib/ref-resolver';

interface Props {
  display: string;
  resolvers: RefResolvers;
}

export function EvolutionDisplay({ display, resolvers }: Props) {
  const segments = parseDisplay(display);
  console.log(display, segments, resolvers);
  return (
    <>
      {segments.map((seg, i) => {
        if (seg.kind === 'text') {
          return <span key={i}>{seg.value}</span>;
        }

        const resolved = resolvers[seg.refType](seg.refKey);

        if (resolved.href) {
          return (
            <Link
              key={i}
              href={resolved.href}
              className="font-medium text-primary underline decoration-dotted underline-offset-2"
            >
              {resolved.label}
            </Link>
          );
        }
        return (
          <span key={i} className="font-medium text-foreground">
            {resolved.label}
          </span>
        );
      })}
    </>
  );
}
