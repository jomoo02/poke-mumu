interface PokedexDexNumberLayoutFormUIProps {
  params: Promise<{ dexNumber: number | string; form?: string }>;
}

export default async function PokedexDexNumberLayoutFormUI({
  params,
}: PokedexDexNumberLayoutFormUIProps) {
  const { dexNumber, form } = await params;

  return (
    <div>
      {dexNumber}, {form}
    </div>
  );
}
