import Link from 'next/link';

// import Card from './ui/card';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardGroup,
  CardGroupLabel,
  CardHeader,
  CardTitle,
} from '@/app/shared/ui/card';
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
import { Badge } from '@/app/shared/ui/badge';
import { Fragment } from 'react/jsx-runtime';

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

export default function PokedexPageUI() {
  return (
    <div className="flex flex-col max-w-384 mine-h-dvh py-8 w-full mx-auto  p-6 px-4 sm:px-6 xl:px-10">
      <h1 className="text-4xl font-bold tracking-wide mt-4 mb-6" id="dex">
        도감
      </h1>
      <p className="pb-6 text-muted-foreground">{`${'전국도감 및 버전별 지역도감 목록'}`}</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/pokedex/all" className="rounded-4xl group h-full ">
          <Card className="group-hover:bg-accent group-active:bg-accent">
            <CardHeader>
              <CardTitle>전국도감</CardTitle>
              <CardDescription>National Pokédex</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 flex-wrap">
                <Badge variant={'blue'}>모든 포켓몬</Badge>
                <Badge variant={'blue'}>종족값</Badge>
              </div>
            </CardContent>
          </Card>
        </Link>
        {regionalDex.map(({ gen, genDexs }) => (
          <Fragment key={gen}>
            {genDexs.map(({ title, href, subTitle, labels }) => (
              <Link
                key={title}
                href={href}
                className="rounded-4xl group h-full "
              >
                <Card className="group-hover:bg-accent group-active:bg-accent">
                  <CardHeader>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{subTitle}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-x-2 gap-y-2">
                      <Badge variant={'blue'}>{gen}</Badge>
                      {labels?.map((label) => (
                        <Badge key={label} variant="blue">
                          {label}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
