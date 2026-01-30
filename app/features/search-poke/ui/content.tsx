import { useSearchContext } from '../provider/search.context';
import { LoaderCircleIcon } from 'lucide-react';

import Item from './item';
import { memo } from 'react';
import { cn } from '@/app/shared/lib/cn';

const Content = memo(function Content() {
  const {
    isLoading,
    searchResult,
    // isError,
    isInputEmpty,
    activeIndex,
    registerItem,
    // onMouseEnterItem,
    onMouseMoveItem,
    listContainerRef,
  } = useSearchContext();
  const errorText = '에러 발생! 다시 검색해 주세요';
  const noRecentSearchText = '최근 검색한 포켓몬이 없습니다';
  const noSearchResultText = '일치하는 포켓몬이 없습니다';
  const noPokeText = isInputEmpty ? noRecentSearchText : noSearchResultText;

  // if (isLoading) {
  //   return (
  //     <div className="relative top-52 lg:top-36 w-full flex items-center justify-center">
  //       <div className="animate-spin">
  //         <LoaderCircleIcon className="size-5" />
  //       </div>
  //     </div>
  //   );
  // }

  // if (isError) {
  //   return (
  //     <div className="px-1 lg:px-2 w-full relative top-52 lg:top-36 text-center text-slate-800">
  //       {errorText}
  //     </div>
  //   );
  // }

  if (searchResult.length === 0) {
    return (
      <div className="h-full flex-1 py-4 px-4 overflow-y-auto flex flex-col gap-1">
        {noPokeText}
      </div>
    );
  }

  return (
    <div
      ref={listContainerRef}
      className={cn(
        'h-full flex-1 py-4 px-4 overflow-y-auto flex flex-col gap-1',
      )}
    >
      {searchResult.map((poke, i) => (
        <div
          key={poke.pokeKey}
          ref={registerItem(i)}
          onMouseMove={() => onMouseMoveItem(i)}
        >
          <Item item={poke} isActive={activeIndex === i} />
        </div>
      ))}
    </div>
  );
});

export default Content;
