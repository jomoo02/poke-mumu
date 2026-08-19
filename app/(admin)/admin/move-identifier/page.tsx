import Link from 'next/link';
import { createAnonClient } from './_shared/supabase/anonClient';
import { toNumber } from './_shared/lib/coerce';

// export const dynamic = 'force-dynamic';

interface MoveListRow {
  identifier: string;
  name_ko: string;
  name_en: string;
  type_id: number | string;
}

function sanitize(q: string): string {
  return q.replace(/[,()%*\\]/g, '').trim();
}

async function searchMoves(query: string): Promise<MoveListRow[]> {
  const q = sanitize(query);
  if (q.length === 0) return [];
  const supabase = createAnonClient();
  const pattern = `%${q}%`;
  const { data } = await supabase
    .from('move')
    .select('identifier, name_ko, name_en, type_id')
    .or(
      `name_ko.ilike.${pattern},name_en.ilike.${pattern},identifier.ilike.${pattern}`,
    )
    .order('id', { ascending: true })
    .limit(30);
  return (data ?? []) as unknown as MoveListRow[];
}

export default async function MoveIdentifierIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = '' } = await searchParams;
  const moves = await searchMoves(q);

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-5 p-4 sm:p-6">
      <header className="flex flex-col gap-1">
        <h1 className="text-xl font-bold text-foreground">기술 편집 — 검색</h1>
        <p className="text-sm text-muted-foreground">
          편집할 기술을 검색해 선택하세요. (change_log · champions_move ·
          champions_poke_move)
        </p>
      </header>

      <form className="flex gap-2" action="" method="get">
        <input
          name="q"
          defaultValue={q}
          placeholder="기술 이름(한/영) 또는 identifier"
          className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
        <button
          type="submit"
          className="inline-flex items-center rounded-md bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground hover:opacity-90"
        >
          검색
        </button>
      </form>

      {q.trim() === '' ? (
        <p className="text-sm text-muted-foreground">검색어를 입력하세요.</p>
      ) : moves.length === 0 ? (
        <p className="text-sm text-muted-foreground">결과가 없습니다.</p>
      ) : (
        <ul className="flex flex-col divide-y divide-border rounded-lg border border-border">
          {moves.map((m) => (
            <li key={m.identifier}>
              <Link
                href={`/admin/move-identifier/${m.identifier}`}
                className="flex items-center justify-between gap-3 p-3 hover:bg-muted"
              >
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-foreground">
                    {m.name_ko}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {m.name_en} · {m.identifier}
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">
                  type {toNumber(m.type_id)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
