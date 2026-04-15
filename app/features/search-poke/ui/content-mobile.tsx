import { useSearchContext } from '../provider/search.context';

import Item from './item';
import { memo } from 'react';
import { cn } from '@/app/shared/lib/cn';
import { LoaderCircleIcon } from 'lucide-react';
import ItemMobile from './item-mobile';

const ContentMobile = memo(function Content() {
  const {
    searchResult,
    // isError,
    isInputEmpty,
    activeIndex,
    registerItem,
    isPending,
    // onMouseEnterItem,
    onMouseMoveItem,
    listContainerRef,
  } = useSearchContext();
  const errorText = '에러 발생! 다시 검색해 주세요';
  const noRecentSearchText = '최근 검색한 포켓몬이 없습니다';
  const noSearchResultText = '일치하는 포켓몬이 없습니다';
  const noPokeText = isInputEmpty ? noRecentSearchText : noSearchResultText;

  if (isPending) {
    return (
      <div className="h-full w-full bg-card">
        <div className="relative top-52 lg:top-36 w-full flex items-center gap-2 justify-center bg-card">
          <span className="text-sm text-muted-foreground animate-bounce">
            검색 중
          </span>
          <span className=" animate-bounce">...</span>
          {/* <div className="animate-spin">
            <LoaderCircleIcon className="size-4" />
          </div> */}
        </div>
      </div>
    );
  }

  // if (isError) {
  //   return (
  //     <div className="px-1 lg:px-2 w-full relative top-52 lg:top-36 text-center text-slate-800">
  //       {errorText}
  //     </div>
  //   );
  // }

  if (searchResult.length === 0) {
    return (
      <div className="h-full flex-1 py-4 px-4 overflow-y-auto flex flex-col gap-1 bg-card">
        {noPokeText}
      </div>
    );
  }

  return (
    <div
      ref={listContainerRef}
      className={cn(
        'h-full flex-1 py-2 px-4 overflow-y-auto flex flex-col gap-1 bg-card',
      )}
    >
      {searchResult.map((poke, i) => (
        <div key={poke.pokeKey}>
          <ItemMobile item={poke} />
        </div>
      ))}
    </div>
  );
});

export default ContentMobile;
