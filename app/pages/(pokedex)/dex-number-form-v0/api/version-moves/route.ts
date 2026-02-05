import { NextResponse } from 'next/server';

import { createClient } from '@/app/shared/lib/supabase/client';
import { getAllType } from '@/app/entities/type/api';

import { MoveView } from '../../model';

import { resolveVersionSource } from './utils';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const versionGroupId = Number(searchParams.get('versionGroupId') || 21);

  const { table, adapter } = resolveVersionSource(versionGroupId);

  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .eq('version_group_id', Number(versionGroupId));

    if (error) {
      console.error('getVersionMoves error:', error);
      return NextResponse.json(
        { message: 'getVersionMoves error' },
        { status: 500 },
      );
    }

    if (!data || data.length === 0) {
      return NextResponse.json(null, { status: 200 });
    }

    const typeAll = await getAllType();
    const typeMap = new Map(typeAll.map((t) => [t.identifier, t]));

    const payload: [number, MoveView][] = data.map((d) => {
      const foundTypeDto = typeMap.get(d.type!) || {
        identifier: 'unknwon',
        name: '???',
      };
      return [d.move_id, adapter(d, foundTypeDto)];
    });

    return NextResponse.json(payload, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    );
  }
}
