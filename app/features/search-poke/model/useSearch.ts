import useSWR from 'swr';
import { SearchPoke } from '.';
import { useDebounce } from 'use-debounce';

const fetcher = (inputValue: string) =>
  fetch(`/features/search-poke/api?inputValue=${inputValue}`).then((res) =>
    res.json(),
  ) as Promise<SearchPoke[]>;

export default function useSearch(input: string) {
  const [value] = useDebounce(input, 300);

  const isDebouncing = input !== value;

  const { data, error, isLoading } = useSWR(value || null, fetcher, {
    keepPreviousData: true,
  });

  const isPending = input !== '' && (isDebouncing || isLoading);

  return {
    data,
    error,
    isLoading,
    isPending,
  };
}
