import { NextResponse } from 'next/server';

import { createClient } from '@/app/shared/lib/supabase/client';

import { getSearchColumn } from './utils';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const inputValue = searchParams.get('inputValue') || '';

  const supabase = createClient();

  try {
    const { column, value } = getSearchColumn(inputValue);

    const query = supabase
      .from('poke')
      .select(
        `
        id,
        dexNumber:no,
        pokeKey:poke_key,
        name:name_ko,
        sprite,
        form,
        type1: type!type_1_id (
          id,
          identifier,
          name:type_ko
        ),
        type2: type!type_2_id (
          id,
          identifier,
          name:type_ko
        )
      `,
      )
      .order('id', { ascending: true });

    const payload =
      column === 'no'
        ? ((await query.eq('no', Number(value))).data ?? [])
        : ((await query.like(column, `%${value}%`)).data ?? []);

    return NextResponse.json(payload, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    );
  }
}
