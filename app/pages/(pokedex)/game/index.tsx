import Link from 'next/link';

import {
  generation1,
  generation2,
  generation3,
  generation4,
  generation5,
  generation6,
  generation7,
  generation8,
  generation9,
} from '../pokedex/config';

import Card from '../pokedex/ui/card';
const regionalDex = [
  { gen: '1세대', genDexs: generation1 },
  { gen: '2세대', genDexs: generation2 },
  { gen: '3세대', genDexs: generation3 },
  { gen: '4세대', genDexs: generation4 },
  { gen: '5세대', genDexs: generation5 },
  { gen: '6세대', genDexs: generation6 },
  { gen: '7세대', genDexs: generation7 },
  { gen: '8세대', genDexs: generation8 },
  { gen: '9세대', genDexs: generation9 },
];
export default function PokedexGamePageUI() {
  return (
    <div className="max-w-7xl mx-auto w-full p-6">
      <h1>게임별 도감</h1>
      <div className="flex flex-col">
        {regionalDex.map(({ gen, genDexs }) => (
          <div key={gen} className="flex flex-col">
            <div className="my-4">
              <Link
                href={`/pokedex/#${gen}`}
                id={gen}
                className="text-2xl font-semibold scroll-m-32 rounded-md outline-ring scroll-smooth"
              >
                {gen}
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {genDexs.map(({ title, content, href, subTitle }) => (
                <Card key={title} href={href} title={title} subTitle={subTitle}>
                  {content}
                </Card>
              ))}
            </div>
            <div className="w-full bg-border h-px my-8 sm:my-10" />
          </div>
        ))}
      </div>
    </div>
  );
}
