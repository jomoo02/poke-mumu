'use client';

import { LayoutGridIcon, ListIcon } from 'lucide-react';

import { Tabs, TabsList, TabsTrigger } from '@/shared/ui/tabs';

import useModeTab from './useModeTab';
import { POKE_LIST_MODE } from '../../model';

export default function ModeTab() {
  const { mode, setMode } = useModeTab();

  return (
    <div className="flex justify-end">
      <Tabs value={mode}>
        <TabsList
          className={'p-1 gap-0.5 rounded-2xl group-data-horizontal/tabs:h-12'}
        >
          <TabsTrigger
            onClick={() => setMode(POKE_LIST_MODE.grid)}
            value={POKE_LIST_MODE.grid}
            className={'rounded-xl px-4'}
          >
            <LayoutGridIcon className="size-4.5" />
          </TabsTrigger>
          <TabsTrigger
            onClick={() => setMode(POKE_LIST_MODE.list)}
            value={POKE_LIST_MODE.list}
            className={'rounded-xl px-4'}
          >
            <ListIcon className="size-4.5" />
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
