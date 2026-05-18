// app/pages/[pokeKey]/api/move/route.ts
import { NextResponse } from 'next/server';
import { getPokeMovesByVg } from '@/app/pages/(pokedex)/pokeKey/api/move';

// export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ pokeKey: string }> },
) {
  const { pokeKey } = await params;
  const { searchParams } = new URL(request.url);
  const vgParam = searchParams.get('vg');

  if (!vgParam) {
    return NextResponse.json(
      { message: 'vg query param required' },
      { status: 400 },
    );
  }

  const vg = Number(vgParam);
  if (!Number.isFinite(vg) || vg <= 0) {
    return NextResponse.json({ message: 'invalid vg' }, { status: 400 });
  }

  try {
    const result = await getPokeMovesByVg(pokeKey, vg);
    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    console.error('GET /pages/[pokeKey]/api/move error:', err);
    return NextResponse.json(
      { message: 'internal server error' },
      { status: 500 },
    );
  }
}
