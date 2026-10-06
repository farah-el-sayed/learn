import { localizeText } from "../i18n.js";import { useTranslation } from "react-i18next";import { Fragment } from 'react';
import CourseCard from './CourseCard.jsx';
import EmptyState from './EmptyState.jsx';

// Column presets follow the grids already used in MyCourses / Dashboard.
const colMap = {
  1: '',
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-2 xl:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'
};

const gapMap = { 4: 'gap-4', 5: 'gap-5', 6: 'gap-6', 8: 'gap-8' };

export function CourseGrid({
  courses = [],
  cols = 3,
  gap = 5,
  getProgress,
  cardProps,
  renderItem,
  onEnroll,
  empty = 'No courses on this shelf yet.',
  emptyTitle,
  emptyAction,
  className = ''
}) {useTranslation();
  const list = courses || [];
  if (!list.length) {
    return <EmptyState title={emptyTitle} lede={empty} action={emptyAction} className={className} />;
  }
  return (
    <div className={`grid ${gapMap[gap] || gapMap[5]} ${colMap[cols] || colMap[3]} ${className}`.trim()}>
      {localizeText(list.map((course, i) =>
      renderItem ?
      <Fragment key={course?.id || i}>{localizeText(renderItem(course, i, onEnroll))}</Fragment> :
      <CourseCard key={course?.id || i} course={course} progress={getProgress ? getProgress(course) : undefined} onEnroll={onEnroll} {...cardProps} />
      ))}
    </div>);

}

export default CourseGrid;
