import { useLayoutEffect } from 'react';

const STORAGE_PREFIX = 'poke-mumu:scroll:';

// 문서마다 한 번만 복원한다 (모듈 변수는 새로고침하면 초기화된다).
// 같은 문서 안에서 링크로 다시 들어오거나 Activity가 다시 보여줄 때는 복원하지 않는다
let isRestoreConsumed = false;

const getStorageKey = () =>
  `${STORAGE_PREFIX}${window.location.pathname}${window.location.search}`;

// 이 문서를 새로고침했거나 브라우저 뒤로·앞으로로 새로 불러왔고, 지금 주소가 그 문서의 주소일 때만
// (다른 페이지에서 새로고침한 뒤 링크로 이 페이지에 들어오면 탐색 종류는 reload여도 주소가 다르다)
const isRestorableLoad = () => {
  const [entry] = performance.getEntriesByType('navigation');

  return (
    entry instanceof PerformanceNavigationTiming &&
    (entry.type === 'reload' || entry.type === 'back_forward') &&
    entry.name === window.location.href
  );
};

const readSavedScroll = () => {
  try {
    return Number(sessionStorage.getItem(getStorageKey())) || 0;
  } catch {
    return 0;
  }
};

const saveScroll = () => {
  try {
    sessionStorage.setItem(getStorageKey(), String(Math.round(window.scrollY)));
  } catch {
    // 저장소를 못 쓰면(사생활 보호 모드 등) 복원만 건너뛴다
  }
};

/**
 * 새로고침했을 때 보던 위치로 돌아간다.
 * 떠날 때 위치를 저장해 두고, 목록을 그린 직후(페인트 전) 직접 옮긴다.
 * 같은 문서 안의 뒤로 가기는 Activity가 DOM을 보존해 Next가 복원하므로 여기서 하지 않는다
 */
export function useReloadScrollRestoration() {
  useLayoutEffect(() => {
    if (!isRestoreConsumed) {
      isRestoreConsumed = true;

      if (isRestorableLoad()) {
        const saved = readSavedScroll();

        if (saved > 0) {
          window.scrollTo({ top: saved });
        }
      }
    }

    // 새로고침·탭 닫기·앱 전환(모바일은 pagehide가 안 올 때가 있다) 때 저장
    const saveWhenHidden = () => {
      if (document.visibilityState === 'hidden') {
        saveScroll();
      }
    };

    window.addEventListener('pagehide', saveScroll);
    document.addEventListener('visibilitychange', saveWhenHidden);

    return () => {
      window.removeEventListener('pagehide', saveScroll);
      document.removeEventListener('visibilitychange', saveWhenHidden);
    };
  }, []);
}
