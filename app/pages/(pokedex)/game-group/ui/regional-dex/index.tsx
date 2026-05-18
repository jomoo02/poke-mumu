'use client';

import { useViewMode } from '../view-mode.context';
import { type RegionalPokeView } from '../../model';
import RegionalDexList from './regional-dex.list';
import RegionalDexGrid from './regional-dex.grid';

interface RegionaldexProps {
  pokes: RegionalPokeView[];
}

export default function Regionaldex({ pokes }: RegionaldexProps) {
  const { viewMode } = useViewMode();

  if (viewMode === 'list') {
    return <RegionalDexList pokes={pokes} />;
  }

  return <RegionalDexGrid pokes={pokes} />;
}
