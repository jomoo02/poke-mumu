import type { Detail } from './type';
import getDetailDisplayLink from './detail-item.utils';

export default function Detail({ display }: Detail) {
  return display.split(/(\[\[.*?\]\])/).map((part, i) => {
    const match = part.match(/\[\[(.*?)\]\]/);
    if (match) {
      const key = match[1];
      const item = getDetailDisplayLink(key);

      if (!item) {
        return part;
      }

      if ('href' in item) {
        return (
          <a
            key={`${part}-${i}`}
            href={item.href}
            className=" underline underline-offset-2 font-medium"
          >
            {item.name}
          </a>
        );
      }

      return item.name;
    }
    return part;
  });
}
