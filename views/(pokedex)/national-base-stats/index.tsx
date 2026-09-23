import { PageLayoutContainer } from '@/shared/ui/page-layout';
import PagePagination from './ui/page-pagination';

export default function NationalStatsView() {
  return (
    <PageLayoutContainer>
      <PagePagination totalPages={17} />
    </PageLayoutContainer>
  );
}
