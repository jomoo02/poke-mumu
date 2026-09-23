import { ReadonlyURLSearchParams } from 'next/navigation';

import { clampPage } from '@/_shared/lib/pagination';

const buildPageHref = (
  pathname: string,
  searchParams: URLSearchParams | ReadonlyURLSearchParams,
  targetPage: number,
  totalPages: number,
  paramName = 'page',
): string => {
  const clamped = clampPage(targetPage, totalPages);
  const params = new URLSearchParams(searchParams.toString());

  if (clamped <= 1) {
    params.delete(paramName);
  } else {
    params.set(paramName, String(clamped));
  }

  const query = params.toString();
  return query ? `${pathname}?${query}` : pathname;
};

export { buildPageHref };
