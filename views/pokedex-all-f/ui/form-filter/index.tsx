import FormFilterDesktop from './desktop';
import FormFilterMobile from './mobile';

interface FormFilterProps {
  isMobile: boolean;
}

export default function FormFilter({ isMobile }: FormFilterProps) {
  return isMobile ? <FormFilterMobile /> : <FormFilterDesktop />;
}
