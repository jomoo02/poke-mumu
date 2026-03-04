interface PokedexTableFooterProps {
  count: number;
  total: number;
}

export default function PokedexTableFooter({
  count,
  total,
}: PokedexTableFooterProps) {
  // const content = `전체 ${total}마리 중 ${count}마리 `;
  const contentEn = `${count} of ${total} Pokémon`;
  return (
    <div className="h-12 flex items-center px-4 text-sm text-muted-foreground  justify-end">
      {contentEn}
    </div>
  );
}
