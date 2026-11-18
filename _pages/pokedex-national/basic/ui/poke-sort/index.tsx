import PokeSortDesktop from './desktop';
import PokeSortMobile from './mobile';

interface PokeSortProps {
  isMobile: boolean;
}

export default function PokeSort({ isMobile }: PokeSortProps) {
  return isMobile ? <PokeSortMobile /> : <PokeSortDesktop />;
}
