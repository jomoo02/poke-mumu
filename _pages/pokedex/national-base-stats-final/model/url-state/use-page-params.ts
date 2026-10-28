import { useListParams } from './use-list-params';

export function usePageParam() {
  const { params } = useListParams();

  return { page: params.page };
}
