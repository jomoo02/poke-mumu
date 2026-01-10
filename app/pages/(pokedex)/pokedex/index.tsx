import Card from './ui/card';
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
} from './config';
import Link from 'next/link';

export default function PokedexPageUI() {
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
  return (
    <div className="flex flex-col max-w-7xl w-full mx-auto p-6">
      <h1
        className="text-4xl font-semibold tracking-tight scroll-m-24"
        id="dex"
      >
        도감
      </h1>
      <p className="py-10 text-muted-foreground">{`${'전국도감 및 세대·버전별 지역도감 목록'}`}</p>
      <h2 className="text-3xl font-semibold mb-6">전국도감</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card title="전국도감" href="/pokedex/all" subTitle="National Pokédex">
          모든 포켓몬 정보
        </Card>
      </div>
      <div className="w-full bg-border h-px my-8 sm:my-10" />
      <h2 className="text-3xl font-semibold mb-6">지역도감</h2>
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
