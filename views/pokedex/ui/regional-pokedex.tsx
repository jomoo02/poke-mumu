import {
  Card,
  CardContent,
  CardItem,
  CardGroup,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';

import { REGIONAL_POKEDEX_LIST } from '../config/regional-version-group';
import Link from 'next/link';

export default function RegionalPokedexList() {
  return (
    <div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {REGIONAL_POKEDEX_LIST.map(({ region, pokedexs }) => (
          <Card key={region}>
            <CardHeader>
              <CardTitle>{region}</CardTitle>
            </CardHeader>

            <CardContent className="gap-y-4">
              {pokedexs.map((pokedex) => (
                <Link
                  key={pokedex.title}
                  href={pokedex.href}
                  className="block bg-accent/50 rounded-2xl px-4 py-3"
                >
                  <CardItem className="">
                    <div className="font-medium">{pokedex.title}</div>
                    <div className="text-foreground/70 text-sm">
                      {pokedex.subTitle}
                    </div>
                  </CardItem>
                </Link>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
