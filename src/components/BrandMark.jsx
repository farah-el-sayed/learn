import { useTranslation } from "react-i18next";import { BookOpenCheck } from 'lucide-react';

const dimensions = {
  sm: { box: 'h-8 w-8', icon: 17 },
  md: { box: 'h-11 w-11', icon: 23 },
  lg: { box: 'h-14 w-14', icon: 30 }
};

export default function BrandMark({ size = 'md', className = '' }) {useTranslation();
  const dimension = dimensions[size] || dimensions.md;

  return (
    <span className={`inline-flex shrink-0 items-center justify-center bg-pine text-paper shadow-subtle ring-1 ring-pine-deep/25 ${dimension.box} ${className}`.trim()} aria-hidden="true">
      <BookOpenCheck size={dimension.icon} strokeWidth={2} />
    </span>);

}
