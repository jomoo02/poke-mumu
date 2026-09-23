import FilterDesktop from './filter.desktop';
import FilterMobile from './filter.mobile';
import type { FilterConfig } from '../../model/poke-filter';

interface FilterProps {
  config: FilterConfig;
  isMobile: boolean;
}

export default function Filter({ config, isMobile }: FilterProps) {
  return isMobile ? (
    <FilterMobile config={config} />
  ) : (
    <FilterDesktop config={config} />
  );
}
